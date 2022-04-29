const express = require('express')
const app = express()
app.use(express.static("static"))
app.set('view engine', 'ejs')

let Database = require('./mockDatabase.js');
app.use(express.json())
const database = new Database()
//console.log(database.getProducts())

app.get('/', (req, res) => {
  let products = database.getProducts()
  res.render('index', {products})
})

app.get("/swipe", (req, res) => {
  res.render('home')
})

app.get("/profile", (req, res) => {
  user = database.getEmma()
  orders = database.getOrders()
  console.log(user)
  res.render("profile", {user, orders})
})

app.get("/likedItems", (req, res) => {
  likeList = database.getLikedItems()
  res.render("likedItems", {likeList})
})




module.exports = app;