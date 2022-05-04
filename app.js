const express = require('express')
const app = express()
app.use(express.static("static"))
app.set('view engine', 'ejs')

//let Database = require('./mockDatabase.js');
let database = require('./databaseAccessLayer.js');
app.use(express.json())
// const database = new Database()
//console.log(database.getProducts())

app.get("/posts", async (req, res) => {
  try {
    const posts = await database.getProducts()
    res.send(posts)
  } catch (error) {
    console.error(error)
    res.status(500).send({ error: "🖕" })
  }
})

app.get('/', (req, res) => {
  res.render('home')
})

app.get('/api/products', async (req, res) => {
  let products = await database.getProducts()
  res.json({products})
})

app.get("/swipe", (req, res) => {
  res.render('home')
})

app.get("/profile", async (req, res) => {
 let users = await database.getUser()
  let posts = await database.getMyPost()
  res.render("profile", {users, posts})
  for(let user of users ){
  if (user.user_id ===1){
    console.log(user.username)
  }
}
})



app.get("/likedItems", async (req, res) => {
  let likeList = await database.getUserLikedItems()
  console.log(likeList)
  res.render("likedItems", {likeList})
})

app.get("/payment", (req, res) => {
  myOrders = database.gerPaidOrders()
  res.render("payment")
})

app.get("/addPayment", (req, res)=>{
  res.render("addPayment")
})


module.exports = app;