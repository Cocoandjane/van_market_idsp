import axios from 'https://cdn.skypack.dev/axios'
//handling s3 images
const imageForm = document.querySelector("#form")
const imageInput = document.querySelector("#files")

async function uplodFile(file) {
    // get secure url form our server
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

    const imageUrl = url.split("?")[0]
    console.log(imageUrl)

    return imageUrl
}

imageForm.addEventListener("submit", async event => {
    event.preventDefault()
    const file = imageInput.files[0]
    let imageUrl = null
    if (file) {
        imageUrl = await uplodFile(file)
    } else {
        imageUrl = document.querySelector("#imageUrl").value
    }

    let title = document.querySelector(".title").value
    let price = document.querySelector(".price").value
    let condition = document.querySelector("#condition").value
    let description = document.querySelector(".description").value
    console.log(description)
    let category_id = document.getElementById("cateogty").value
    let location_id = document.getElementById("Location").value
    //location
    //console.log(title, price, condition, description)
    let idkSomeArray = location.href.split("/")
    let postId = idkSomeArray[idkSomeArray.length-1]

    
    axios.post(`/editPost/${postId}`, {title, price, condition, description, imageUrl, category_id , location_id})
        .then(response => {
            let id = response.data
            //location.href = `/viewListing`
            // success go to the next page
            window.location = `/viewListing/${id}`
        })
        .catch((err) => {
            console.log('ERR', err)
        })
})

const image_input = document.querySelector(".imageUpload");
//console.log(image_input )
let uploaded_image ="";
let oldImg = document.querySelector("div.display_image").dataset.image
document.querySelector("div.display_image").style.backgroundImage=`url(${oldImg})`
image_input.addEventListener("change", (event)=>{
    event.preventDefault()
    // console.log( image_input.value);
    const reader = new FileReader();
    reader.addEventListener("load", ()=>{
        uploaded_image = reader.result;
        document.querySelector("div.display_image").style.backgroundImage=`url(${uploaded_image})`
    })
    // console.log(image_input)
    reader.readAsDataURL(image_input.files[0])
})