const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mysql = require('mysql2')
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
  let products = await database.getPosts()
  res.json({ products })
})

app.get("/swipe", (req, res) => {
  res.render('home')
})

app.get("/profile", async (req, res) => {
  let users = await database.getUser()
  let posts = await database.getMyPost()
  res.render("profile", { users, posts })
})


app.get("/likedItems", async (req, res) => {
  let likeList = await database.getUserLikedItems()
  console.log(likeList)
  res.render("likedItems", { likeList })
})


app.get("/createListing", (req, res) => {
  res.render("createListing")
})


app.post("/createListing", async (req, res) => {
  database.insertPost(req.body, (err, result) => {
    console.log(req.body)
    if (err) {
      res.render('error', { message: 'Error writing to MySQL' });
      console.log("Error writing to mysql");
      console.log(err);
    }
    else { //success
      res.redirect("/");
      //Output the results of the query to the Heroku Logs
      console.log(result);
    }
  })
  // // title, description, price, user_id, condition_type_id, category_id
  // // let img = req.body.img;
  // let user = 1;
  // let title = req.body.title;
  // let price = req.body.price;
  // let condition = req.body.condition_type_id;
  // let description = req.body.description;
  // let category = req.body.category_id;
  // // let location = req.body.location;
  // console.log(req.body)
  // try {
  //   await database.addPost(title, description, 1, 1, 1, 1, 1, "muradd")
  //   res.redirect('/')
  // }
  // // 1, "https://img.ltwebstatic.com/images3_pi/2020/12/17/1608191555ab585116fb1b3f892150e679c960f03e_thumbnail_900x.webp"
  // catch (err){
  //   console.log(err)
  //   res.status(500).send('Something went wrong...')
  // }
})



module.exports = app;
  // let data = req.body;
  // console.log(data)
  // res.render('createListing')
  // res.redirect('/')
  // redirect
  // when we create listing we want to redirect back to the home page