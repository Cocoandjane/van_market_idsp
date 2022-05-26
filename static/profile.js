

let profile = document.querySelector(".person")
profile.addEventListener("click", (event) => {
 event.preventDefault()
 window.location="/editProfile"
})

let posts = document.querySelectorAll(".arrowFrame")
posts.forEach(post => {
    post.addEventListener("click" , (event) => {
        event.preventDefault();     
        let id = post.dataset.id
        window.location=`/viewListing/${id}`
    })
})

