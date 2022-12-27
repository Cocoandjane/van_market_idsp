import axios from 'https://cdn.skypack.dev/axios@v0.27.2'


let people = document.querySelectorAll(".all")
people.forEach(p => {
    p.addEventListener("click", (event) => {
        console.log("click")
        event.preventDefault()
        let id = p.dataset.id
        window.location = `/chat/${id}`
    })
})

// let recentMsg = document.querySelectorAll(".recentMsg")
// for (let i = 0; i < recentMsg.length; i++) {
//     let roomIds = recentMsg[i].dataset.id
//     //
//     for (let roomId of roomIds) {
//         axios.post("/messages", { roomId })
//             .then(response => {
//                 let chatHistery = response.data
//                 debugger
//                 recentMsg[i].innerHTML = chatHistery[0].message
//             })
//     }
// }

// console.log(luxon.DateTime.now().toISO())
let recentTime = document.querySelectorAll(".time")
for (let i = 0; i < recentTime.length; i++) {
   console.log(luxon.DateTime.fromISO(recentTime[i].dataset.time).day)
   console.log(luxon.DateTime.now().day)
    if(luxon.DateTime.now().day - luxon.DateTime.fromISO(recentTime[i].dataset.time).day === 1){
        recentTime[i].innerHTML = "yesterday"
    } else if(luxon.DateTime.now().day - luxon.DateTime.fromISO(recentTime[i].dataset.time).day > 1){
        recentTime[i].innerHTML = luxon.DateTime.fromISO(recentTime[i].dataset.time).toLocaleString(luxon.DateTime.DATE_MED)
    } else (
        recentTime[i].innerHTML =luxon.DateTime.fromISO(recentTime[i].dataset.time).toLocaleString({ hour: 'numeric', minute: 'numeric'})
    )
}





// let chatHistery = JSON.parse(localStorage.getItem(roomId))
// recentMsg[i].innerHTML = chatHistery[chatHistery.length-1].text