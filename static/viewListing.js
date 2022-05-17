import axios from 'https://cdn.skypack.dev/axios'
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

    // window.location.reload()

    requestAnimationFrame(() => {
        document.querySelector(".submit-btn ").classList.add("displayNone")
        document.querySelector(".addImgIcon").classList.remove("displayNone")
        requestAnimationFrame(() => {
            let imageFrame = document.querySelector(".imgFrame")
            imageFrame.scrollTo(imageFrame.scrollWidth, 0)
        })
    })

})

const image_input = document.querySelector(".imageUpload");
//console.log(image_input )
let uploaded_image = "";
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

        let img = document.createElement("img")
        img.classList.add("postImage");
        img.src = `${uploaded_image}`
        imageFrame.insertBefore(img, addbutt)

        requestAnimationFrame(() => {

            document.querySelector(".submit-btn ").classList.remove("displayNone")
            document.querySelector(".addImgIcon").classList.add("displayNone")
          requestAnimationFrame(() => {

              imageFrame.scrollTo(imageFrame.scrollWidth, 0)
          })  
        })
    })
    //console.log(image_input)
    reader.readAsDataURL(image_input.files[0])
})