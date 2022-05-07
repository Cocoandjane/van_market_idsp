import axios from 'https://cdn.skypack.dev/axios'
//handling s3 images
const imageForm = document.querySelector("#form")
const imageInput = document.querySelector("#files")

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

    const imageUrl = url.split("?")[0]
    console.log(imageUrl)

    let title = document.querySelector(".title").value
    let price = document.querySelector(".price").value
    let condition = document.querySelector("#condition").value
    let description = document.querySelector(".description").value
    //location
    //console.log(title, price, condition, description)
    axios.post("/createListing", { title, price, condition, description, imageUrl })
        // axios.post("/createListing", {})
        .then(response => {
            console.log(response)
            location.href = '/'
        })
        .catch((err) => {
            console.log(err)
        })


    // post requet to my server with the iamgeUrl
    // title
    // price
    // description
    // condition
    // location

    // const img = document.createElement("img")
    // img.src = imageUrl
    // document.body.appendChild(img)
})

