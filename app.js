// const express = require('express')
import express from 'express'
const app = express()
//const bodyParser = require('body-parser')
//const mysql = require('mysql2')

app.use(express.static("static"))
app.set('view engine', 'ejs')

import bodyParser from 'body-parser'
import mysql from 'mysql2'
import { generateUploadURL } from "./s3.js";

//let database = require('./databaseAccessLayer.js');
import * as database from './databaseAccessLayer.js'
app.use(express.json())
app.use(express.urlencoded({ extended: false }));


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
  res.render('home')
})

app.get('/api/products', async (req, res) => {
  try {
    let products = await database.getPosts()
    //console.log(products)
    res.json({ products })
  } catch (error) {
    console.error(error)
    res.status(500).send({ error: "🖕" })
  }
})

app.get("/swipe", (req, res) => {
  try {
    res.render('home')
  } catch (error) {
    console.error(error)
    res.status(500).send({ error: "🖕" })
  }
})

app.get("/profile", async (req, res) => {
  try {
    let users = await database.getUser()
    let posts = await database.getMyPost()
    res.render("profile", { users, posts })
  } catch (error) {
    console.error(error)
    res.status(500).send({ error: "🖕" })
  }
})


app.get("/likedItems", async (req, res) => {

  try {
    let likeList = await database.getUserLikedItems()
    //console.log('likedList', likeList)
    res.render("likedItems", { likeList })
  } catch (error) {
    console.error(error)
    res.status(500).send({ error: "🖕" })
  }
})


app.get("/createListing", (req, res) => {
  try {
    res.render("createListing")
  } catch (error) {
    console.error(error)
    res.status(500).send({ error: "🖕" })
  }
})


app.post('/likedItems', async (req, res) => {
  try {
    let likeList = await database.getUserLikedItems()
    let userId = 1;
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
  let image = axiosData.imageUrl;
  let user_id = 1;
  let category_id = 1;
  let condition_type_id = 1;
  let id = await database.insertPost(title, description, price, image, user_id, category_id, condition_type_id)
  res.json(id)
})

app.get('/editPost/:id', async (req, res) => {
  let postId = +req.params.id;
  let [post] = await database.getPost(postId)
  console.log(post)
  // return;

  console.log('here', post.post_id)
  res.render('editPost', { post }) 
})


app.post('/editPost/:id', async (req, res) => { 
    let postId = +req.params.id;
    let data = req.body;
    console.log('dataaa', data)
    let title = req.body.title;
    let description = req.body.description;
    let price = req.body.price;
    let postImage = req.body.imageUrl;
    let userId = 1;
    let categoryId = req.body.category_id;
    let conditionTypeid = 1;
    console.log("lmao",postId)
    await database.getPosts(postId)
    // console.log('post', post)
    // console.log('postid', post.post_id)
    let id = await database.updatePost(postId, title, description, price, postImage, userId, conditionTypeid)
    console.log('this is the id', postId)
    res.json(postId)
    // res.redirect('home')
})




app.get("/viewListing/:id", async (req, res) => {
  console.log('murrrraddddd', req.params)
  let id = +req.params.id
  try {
    const [post] = await database.getNewPost(id)
    console.log('this is the post: ', post)
    res.render("viewListing", { post })
  } catch (error) {
    console.error(error)
    res.status(500).send({ error: "🖕" })
  }
})

export default app;
