import axios from 'https://cdn.skypack.dev/axios'
//handling s3 images
const imageForm = document.querySelector("#form")
const imageInput = document.querySelector("#files")

imageForm.addEventListener("submit", async event => {
    // event.preventDefault()
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
    let idkSomeArray = location.href.split("/")
    let postId = idkSomeArray[idkSomeArray.length-1]
    axios.post(`/editPost/${postId}`, {title, price, condition, description, imageUrl })
        .then(response => {
            console.log('responseData', response)
            let id = response.data
            //location.href = `/viewListing`
            // success go to the next page
            window.location = `/viewListing/${id}`
        })
        .catch((err) => {
            console.log('ERR', err)
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

