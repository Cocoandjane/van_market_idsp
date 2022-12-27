
import axios from 'https://cdn.skypack.dev/axios@v0.27.2'


const imageForm = document.querySelector("#form")
const imageInput = document.querySelector("#files")

imageForm.addEventListener("submit", async event => {
  event.preventDefault()
  const file = imageInput.files[0]
  const { url } = await fetch("/s3Url").then(res => res.json())
  console.log(url)
  await fetch(url, {method: "PUT",
    headers: {
      "Conten_Type": "multipart/form-data"
    },
    body:file
  })

  const imageUrl = url.split("?")[0]
  console.log(imageUrl)

axios.post("/editProfile", {imageUrl})


})


const image_input = document.querySelector(".imageUpload");
let uploaded_image = "";

image_input.addEventListener("change", (event) => {
  event.preventDefault()
  const reader = new FileReader();
  reader.addEventListener("load", () => {
 
      uploaded_image = reader.result;
      
      const img = document.querySelector(".profile-pic")
      img.src = `${uploaded_image}`

      requestAnimationFrame(() => {
        document.querySelector(".submit-btn").click();
    })

  })
  reader.readAsDataURL(image_input.files[0])
})

let editBtn = document.querySelector(".edit-name")
editBtn.addEventListener("click", (event) =>{
  event.preventDefault();
  let editForm = document.querySelector(".nameCard")
  editForm.classList.remove("displayNone")
})

let cancel = document.querySelector(".cancel") 
cancel.addEventListener("click", (event) => {
  editForm.classList.add("displayNone")
})


let confirm = document.querySelector(".confirm")
confirm.addEventListener("click", (event) =>{
  event.preventDefault();
  let newName = document.querySelector(".inputName").value
  axios.post("/editName", {newName})
  let name = document.querySelector(".name")
  name.innerHTML = newName
  let editForm = document.querySelector(".nameCard")
  editForm.classList.add("displayNone")
})
