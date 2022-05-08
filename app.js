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
  //console.log(products)
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
  console.log('likedList' , likeList)
  res.render("likedItems", { likeList })
})


app.get("/createListing", (req, res) => {
  res.render("createListing")
})

// app.get('/likedItems', (req, res) => {
  //   res.render('/likedItems')
  // })
  
  app.post('/likedItems', async (req, res) => {
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
})

//s3
app.get("/s3Url", async (req, res) => {
  const url = await generateUploadURL()
  console.log(url)
  res.send({url})
})

app.post("/createListing", async (req, res) => {
 await database.insertPost(req.body, (err, result) => {
    console.log(req.body)

  })
  res.redirect("/")
})


export default app;
