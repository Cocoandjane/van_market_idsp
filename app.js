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
 try{ let products = await database.getPosts()
  //console.log(products)
  res.json({ products })
 } catch (error) {
  console.error(error)
  res.status(500).send({ error: "🖕" })
}
})

app.get("/swipe", (req, res) => {
  try {res.render('home')
} catch (error) {
    console.error(error)
    res.status(500).send({ error: "🖕" })
  }
})

app.get("/profile", async (req, res) => {
 try{ let users = await database.getUser()
  let posts = await database.getMyPost()
  res.render("profile", { users, posts })
 }catch (error) {
  console.error(error)
  res.status(500).send({ error: "🖕" })
}
})


app.get("/likedItems", async (req, res) => {

  try {let likeList = await database.getUserLikedItems()
  console.log('likedList' , likeList)
  res.render("likedItems", { likeList })
  } catch (error) {
    console.error(error)
    res.status(500).send({ error: "🖕" })
  }
})


app.get("/createListing", (req, res) => {
  try {res.render("createListing")
}catch (error) {
  console.error(error)
  res.status(500).send({ error: "🖕" })
}
})

// app.get('/likedItems', (req, res) => {
  //   res.render('/likedItems')
  // })
  
  app.post('/likedItems', async (req, res) => {
  try{  let likeList = await database.getUserLikedItems()
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

//s3
app.get("/s3Url", async (req, res) => {
 try{ const url = await generateUploadURL()
  console.log(url)
  res.send({url})
 }catch (error) {
  console.error(error)
  res.status(500).send({ error: "🖕" })
}
})

app.post("/createListing", async (req, res) => {
try{ await database.insertPost(req.body, (err, result) => {
    console.log(req.body)

  })
  res.redirect("/")
}catch (error) {
  console.error(error)
  res.status(500).send({ error: "🖕" })
}
})


export default app;
