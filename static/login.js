
import axios from 'https://cdn.skypack.dev/axios'

let loginBtn = document.querySelector(".loginBtn")

loginBtn.addEventListener("click", event => {
    console.log("working")
    let email = document.querySelector("input.email").value
    let password = document.querySelector("input.password").value

    axios.post("/login", { email, password })
        .then(response => {
            // console.log(response)
            if (response.status === 200) {
                window.location = "/swipe"
            }
        })

    event.preventDefault();
})

let signupBtn = document.querySelector("button.signupBtn")
signupBtn.addEventListener("click", event => {
    window.location="/signup"
})


