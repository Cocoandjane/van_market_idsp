let iconViewItems = document.querySelectorAll("div.white_frame")


iconViewItems.forEach(iconViewItem => {
    iconViewItem.addEventListener("click", (event) => {
        event.preventDefault()
        let id = iconViewItem.id
        window.location=`/viewListing/${id}`
    })
})