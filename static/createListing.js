import axios from 'https://cdn.skypack.dev/axios@v0.27.2'
//handling s3 images
const imageForm = document.querySelector("#form")
const imageInput = document.querySelector("#files")

imageForm.addEventListener("submit", async event => {
    event.preventDefault()
    const file = imageInput.files[0]

    //get secure url form our server
    const { url } = await fetch("/s3Url").then(res => res.json())
    // console.log(url)
    // post the image directly to the s3 bucket

    await fetch(url, {
        method: "PUT",
        headers: {
            "Conten_Type": "multipart/form-data"
        },
        body: file
    })

    const imageUrl = url.split("?")[0]
    // console.log(imageUrl)

    let title = document.querySelector(".title").value
    let price = document.querySelector(".price").value
    let condition = document.querySelector("#condition").value
    let description = document.querySelector(".description").value
    let category_id = document.getElementById("cateogty").value
    let location_id = document.getElementById("Location").value

 
    // console.log(title, price, condition, description,category_id,location_id )
    axios.post("/createListing", { title, price, condition, description, imageUrl, category_id, location_id})
        .then(response => {
           // console.log(response.data)
            let id = response.data
            //location.href = `/viewListing`
            // success go to the next page
        window.location = `/viewListing/${id}`
        })
        .catch((err) => {
            console.log(err)
        })
})

const image_input = document.querySelector(".imageUpload");
//console.log(image_input )
let uploaded_image ="";

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
