let email = document.querySelector("input.email").value;
let password = document.querySelector("input.password").value;



let loginForm = document.querySelector("form.login")
loginForm.addEventListener("sumbit", (event) => {
    console.log("woing")
    console.log(email, password)
    event.preventDefault();
})



