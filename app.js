const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.use(express.static("static"))
app.set('view engine', 'ejs')

let database = require('./databaseAccessLayer.js');
app.use(express.json())
app.use(express.urlencoded({ extended: false }));


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
  res.json({ products })
})

app.get("/swipe", (req, res) => {
  res.render('home')
})

app.get("/profile", async (req, res) => {
  let users = await database.getUser()
  let posts = await database.getMyPost()
  res.render("profile", { users, posts })
  for (let user of users) {
    if (user.user_id === 1) {
      console.log(user.username)
    }
  }
})


app.get("/likedItems", async (req, res) => {
  let likeList = await database.getUserLikedItems()
  console.log(likeList)
  res.render("likedItems", { likeList })
})


app.get("/createListing", (req, res) => {
  res.render("createListing")
})

app.post("/createListing", (req, res) => {
  let data = req.body;
  console.log(data)
  res.render('createListing')
  // res.redirect('/')
  // redirect 
  // when we create listing we want to redirect back to the home page
})



module.exports = app;