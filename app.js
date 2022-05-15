
import luxon from "luxon";
// const {DateTime} = 'luxon'
//const express = require('express')
import express from 'express'
const app = express()
//const bodyParser = require('body-parser')
//const mysql = require('mysql2')
import cookieSession from "cookie-session";
app.use(express.static("static"))
app.set('view engine', 'ejs')

import bodyParser from 'body-parser'
import mysql from 'mysql2'
import { generateUploadURL } from "./s3.js";

//let database = require('./databaseAccessLayer.js');
import * as database from './databaseAccessLayer.js'
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cookieSession({
  name: 'session',
  keys: ["vthhfhn"],

  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))

app.get("/posts", async (req, res) => {
  try {
    const posts = await database.getPosts()
    res.send(posts)
  } catch (error) {
    console.error(error)
    res.status(500).send({ error: "🖕" })
  }
})

app.get('/', (req, res) => {
  res.render('login')
})

app.get("/login", async (req, res) => {
  res.render("login")
})

app.post("/login", async (req, res) =>{
  let foundUser = await database.authenticateUser(req.body.email,req.body.password)
  console.log(foundUser)
  let userId = foundUser[0].user_id
  if (foundUser) {
    req.session.userId = userId
    res.sendStatus(200)
    console.log(`login attempt from user ${foundUser[0].username}, SUCCESS`)
  } else {
    res.status(404).send({ error: `username or passwor is incorrect` })
    console.log(`login attempt form user ${userEmail}, failure`)
  }
})



app.get("/signup", (req, res) => {
   res.render("signup", { userId: req.session.userId })

})

app.post("/singup", async (req, res) => {
  console.log(req.body)
  await database.createUser(req.body.name, req.body.email, req.body.password);
  res.sendStatus(200)
})



app.get('/api/products',  async (req, res) => {
  try {
    let products = await database.getPosts()
    res.json({ products })
  } catch (error) {
    console.error(error)
    res.status(500).send({ error: "🖕" })
  }
})


function authorized(req, res, next) {
  if (!req.session.userId) {
    res.redirect("/login")
    return
  }
  next()
}

app.get("/home",authorized, (req, res) => {
  res.render("home")
})

app.get("/swipe", authorized, (req, res) => {
  try {
    res.render('home')
  } catch (error) {
    console.error(error)
    res.status(500).send({ error: "🖕" })
  }
})

app.get("/profile", authorized, async (req, res) => {
  try {
    let users = await database.getUser()
    let posts = await database.getMyPost()
    res.render("profile", { users, posts })
  } catch (error) {
    console.error(error)
    res.status(500).send({ error: "🖕" })
  }
})


app.get("/likedItems", authorized, async (req, res) => {

  try {
    let likeList = await database.getUserLikedItems()
    //console.log('likedList', likeList)
    res.render("likedItems", { likeList })
  } catch (error) {
    console.error(error)
    res.status(500).send({ error: "🖕" })
  }
})


app.get("/createListing", authorized,  (req, res) => {
  try {
    res.render("createListing")
  } catch (error) {
    console.error(error)
    res.status(500).send({ error: "🖕" })
  }
})


app.post('/likedItems', authorized, async (req, res) => {
  try {
    // let likeList = await database.getUserLikedItems()
    let userId = req.session.userId;
    let direction = req.body.dirX
    let productId = +req.body.productId
    console.log('here:', userId, direction, productId)
    if (direction === 1) {
      // let addedToWishList = 
      await database.addToWishlist(userId, productId)
      // res.render('likedItems', {addedToWishList, likeList})
    }
  } catch (error) {
    console.error(error)
    res.status(500).send({ error: "🖕" })
  }
})


app.get("/s3Url", async (req, res) => {
  try {
    const url = await generateUploadURL()
    // console.log('URLLL ',url)
    res.send({ url })
  } catch (error) {
    console.error('this is the erroe', error)
    res.status(500).send({ error: "🖕" })
  }
})


app.post("/createlisting", async (req, res) => {
  let axiosData = req.body
  let title = axiosData.title;
  let description = axiosData.description;
  let price = axiosData.price;
  let date = luxon.DateTime.now().toISODate()
  let image = axiosData.imageUrl;
  let user_id = req.session.userId;
  let category_id = 1;
  let condition_type_id = 1;
  let id = await database.insertPost(title, description, price, date, image, user_id, category_id, condition_type_id)
  res.json(id)
})

app.get('/editPost/:id', authorized, async (req, res) => {
  let postId = +req.params.id;
  let [post] = await database.getPost(postId)
  //console.log(post)
  // return;

  //console.log('here', post.post_id)
  res.render('editPost', { post }) 
})


app.post('/editPost/:id',authorized, async (req, res) => { 
    let postId = +req.params.id;
    let data = req.body;
    //console.log('dataaa', data)
    let title = req.body.title;
    let description = req.body.description;
    let price = req.body.price;
    let postImage = req.body.imageUrl;
    let userId = 1;
    let categoryId = req.body.category_id;
    let conditionTypeid = 1;
    //console.log("lmao",postId)
    await database.getPosts(postId)
    // console.log('post', post)
    // console.log('postid', post.post_id)
    let id = await database.updatePost(postId, title, description, price, postImage, userId, conditionTypeid)
    console.log('this is the id', postId)
    res.json(postId)
    // res.redirect('home')
})



app.get('/showProduct/:id',authorized, (req, res) => {
  let postId = +req.params.id;

res.render('viewListing', {postId})
})


app.get("/viewListing/:id", async (req, res) => {
  let id = +req.params.id
  try {
    let posts = await database.getNewPost(id)
    if (posts.length === 0) {
      res.status(404).send({ message: "this post doesn't exist" })
    } else {
      res.render(`viewListing`, { post: posts })
    }
  } catch (error) {
    console.error(error)
    res.status(500).send({ error: "🖕" })
  }
})

app.post("/deletePost/:id", async (req, res) => {
  let id = +req.params.id
  try {
    let result = await database.deletePost(id)
    res.redirect("/home")
  } catch (error) {
    console.error(error)
    res.status(500).send({ error: "🖕" })
  }
})


export default app;
