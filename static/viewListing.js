

import axios from 'https://cdn.skypack.dev/axios'

let section = document.querySelector("section.top")
let sellerid = section.dataset.sellerid

let sellerName = document.querySelector(".sellerName")
if(sellerName){
sellerName.addEventListener("click", (event) => {
    event.preventDefault()
    axios.post("/sellerid", { sellerid })
        .then(response => {
            // if (response.data.foundRoom===true) {
            //     window.location = `/chat/${response.data.id}`;
            //  } 
            // else {
                let roomId = response.data.roomId;
                console.log(roomId)
                window.location = `/chat/${roomId}`;
            // }

        })
})}




let editBtn = document.querySelector("a.edit")
if (editBtn) {
    editBtn.addEventListener("click", (event) => {
        let editPage = editBtn.href
        window.location = editPage
    })
}

let deleteBtn = document.querySelector("a.delete")
if (deleteBtn) {
    deleteBtn.addEventListener("click", (event) => {
        event.preventDefault()
        let card = document.querySelector(".card")
        card.classList.remove("displayNone");
    })
}

let yes = document.querySelector("button.yes");
yes.addEventListener("click", (event) => {
    //     let x = yes.action
    //    // window.alert("product deleted")
    //     window.location = x
})

let no = document.querySelector("button.no");
no.addEventListener("click", (event) => {
    let card = document.querySelector(".card")
    card.classList.add("displayNone")
    event.preventDefault();
})


///add image

const imageForm = document.querySelector("#form")
const imageInput = document.querySelector("#files")

// console.log(imageForm.dataset.id)
// console.log(imageForm.dataset.name)
// imageForm.dataset.music = 'guitar'

if (imageForm) {
    imageForm.addEventListener("submit", async event => {
        event.preventDefault()
        const file = imageInput.files[0]
        //get secure url form our server
        const { url } = await fetch("/s3Url").then(res => res.json())
        console.log(url)
        // post the image directly to the s3 bucket

        await fetch(url, {
            method: "PUT",
            headers: {
                "Conten_Type": "multipart/form-data"
            },
            body: file
        })

        const postId = imageForm.dataset.id
        console.log(postId)
        const imageUrl = url.split("?")[0]
        console.log(imageUrl)
        axios.post("/addImage", { imageUrl, postId })

        const newImageDeleteFrame = document.createElement("div")
        newImageDeleteFrame.classList.add("deleteFrame")

        let a = document.createElement("a")
        let icon = document.createElement("img")
        icon.src = "/icons/x-butt.svg"
        icon.classList.add("deleteButt")
        a.append(icon)
        deleteButtonClick(icon)

        newImageDeleteFrame.append(a)

        newImageDeleteFrame.innerHTML =
            `
        <a class="singleImg" data-img="${imageUrl}" href="${imageUrl}"><img class="postImage" src="${imageUrl}"></a>
        <a><img class="deleteButt" data-img="${imageUrl}"  src="/icons/x-butt.svg"></a> 
        `

        let imageFrame = document.querySelector(".imgFrame")
        let addbutt = document.querySelector("form#form")
        imageFrame.insertBefore(newImageDeleteFrame, addbutt)
        window.location.reload()


        requestAnimationFrame(() => {
            // document.querySelector(".submit-btn ").click();
            document.querySelector(".addImgIcon").classList.remove("displayNone")
            requestAnimationFrame(() => {
                imageFrame.scrollTo(imageFrame.scrollWidth, 0)
            })
        })
    })
}

const image_input = document.querySelector(".imageUpload");
let uploaded_image = "";


if (image_input) {

    // let deleteFrames = document.querySelectorAll(".deleteFrame")
    // console.log(deleteFrames)
    // let a = document.createElement("a")
    // let icon = document.createElement("img")
    // icon.src = "/icons/x-butt.svg"
    // icon.classList.add("deleteButt")
    // a.append(icon)
    // deleteFrames.forEach(deleteFrame => {
    //      deleteFrame.appendChild(a)
    // })



    image_input.addEventListener("change", (event) => {
        event.preventDefault()
        //console.log( image_input.value);
        const reader = new FileReader();
        reader.addEventListener("load", () => {
            let imageFrame = document.querySelector(".imgFrame")


            let addbutt = document.querySelector("form#form")
            uploaded_image = reader.result;

            // let div = document.createElement("div")
            // div.classList.add("display_image");
            // div.style.backgroundImage = `url(${uploaded_image})`
            // imageFrame.insertBefore(div, addbutt)

            // window.location.reload()



            let img = document.createElement("img")
            img.classList.add("postImage");
            img.src = `${uploaded_image}`

            imageFrame.insertBefore(img, addbutt)

            requestAnimationFrame(() => {
                document.querySelector(".submit-btn ").click()
                document.querySelector(".addImgIcon").classList.add("displayNone")
                requestAnimationFrame(() => {
                    // imageFrame.scrollTo(imageFrame.scrollWidth, 0)
                })
            })
        })
        //console.log(image_input)
        reader.readAsDataURL(image_input.files[0])
    })
}


let xBtns = document.querySelectorAll(".deleteButt")
let imageLink;
function deleteButtonClick(xBtn) {
    xBtn.addEventListener("click", (event) => {
        event.preventDefault()
        let card2 = document.querySelector(".card2")
        card2.classList.remove("displayNone");
        imageLink = xBtn.dataset.img
    })
}
xBtns.forEach(deleteButtonClick)

let cancel = document.querySelector(".cancel")
cancel.addEventListener("click", (event) => {
    event.preventDefault()
    let card2 = document.querySelector(".card2")
    card2.classList.add("displayNone");
})

let ok = document.querySelector(".ok")
ok.addEventListener("click", (event) => {
    event.preventDefault()
    axios.post(`/deleteImg`, { imageLink })
    // window.location = ok.action
    window.location.reload()
})

// requestAnimationFrame(() => {
//     let imageFrame = document.querySelector(".imgFrame")
//     imageFrame.scrollTo(imageFrame.scrollWidth, 0)
// })


let removeWish = document.querySelector(".removeWish")
if (removeWish) {
    removeWish.addEventListener("click", (event) => {
        event.preventDefault()
        let wishid = removeWish.dataset.wishid
        axios.post("/removeWishedItem", { wishid })
        window.location.reload()
    })
}

let addWish = document.querySelector(".addWish")
if (addWish) {
    addWish.addEventListener("click", (event) => {
        event.preventDefault();
        let postId = addWish.id
        axios.post("/addWish", { postId })
        window.location.reload()
    })
}

