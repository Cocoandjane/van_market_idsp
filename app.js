const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.use(express.static("static"))
app.set('view engine', 'ejs')

let Database = require('./mockDatabase.js');
app.use(express.urlencoded({ extended: false }));
// app.use(express.json())
const database = new Database()


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


app.get("/profile", (req, res) => {
  user = database.getEmma()
  orders = database.getOrders()
  res.render("profile", { user, orders })
})


app.get("/likedItems", (req, res) => {
  likeList = database.getLikedItems()
  res.render("likedItems", { likeList })
})


app.get("/createListing", (req, res) => {
  res.render("createListing")
})

app.post("/createListing", (req, res) => {
  let data = req.body;
  console.log(data)
  res.render("createListing")
  // redirect 
})

// app.get("/payment", (req, res) => {
//   myOrders = database.gerPaidOrders()
//   res.render("payment")
// })

// app.get("/addPayment", (req, res)=>{
//   res.render("addPayment")
// })




module.exports = app;