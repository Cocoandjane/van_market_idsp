
import { DateTime } from "luxon";
//const express = require('express')
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
    console.log(url)
    res.send({ url })
  } catch (error) {
    console.error(error)
    res.status(500).send({ error: "🖕" })
  }
})


app.post("/createlisting", async (req, res) => {
  let axiosData = req.body
  let title = axiosData.title;
  let description = axiosData.description;
  let price = axiosData.price;
  let date = DateTime.now().toISODate()
  let image = axiosData.imageUrl;
  let user_id = 1;
  let category_id = 1;
  let condition_type_id = 1;
  let id = await database.insertPost(title, description, price, date, image, user_id, category_id, condition_type_id)
  res.json(id)
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
    res.redirect("/")
  } catch (error) {
    console.error(error)
    res.status(500).send({ error: "🖕" })
  }
})


export default app;
