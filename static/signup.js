import axios from 'https://cdn.skypack.dev/axios'
let signupForm = document.querySelector(".signupForm")
console.log(signupForm)

signupForm.addEventListener("submit", event => {
    event.preventDefault();
    let name = document.querySelector("input.name").value
    let email = document.querySelector("input.email").value
    let password = document.querySelector("input.password").value
    let confirmPassword = document.querySelector("input.confirmPassword").value
   
    axios.post("/singup", {name, email, password, confirmPassword})
    .then(response => {
        if (response.status === 200) {
            window.location = "/login"
        }
    })
})

