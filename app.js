const express = require('express')
const app = express()
app.use(express.static("static"))
app.set('view engine', 'ejs')

let Database = require('./mockDatabase.js');
app.use(express.json())
const database = new Database()
//console.log(database.getProducts())

app.get('/', (req, res) => {
  res.render('home')
})

app.get("/swipe", (req, res) => {
  res.render('home')
})

app.get("/profile", (req, res) => {
  user = database.getEmma()
  orders = database.getOrders()
  res.render("profile", {user, orders})
})

app.get("/likedItems", (req, res) => {
  likeList = database.getLikedItems()
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