
// import luxon from "luxon";
import express from 'express'
const app = express()
import cookieSession from "cookie-session";
app.use(express.static("static"))
app.set('view engine', 'ejs')

import bodyParser from 'body-parser'
import mysql from 'mysql2'
import { generateUploadURL } from "./s3.js";

import * as database from './databaseAccessLayer.js'

import { DateTime } from "luxon";


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

function forLoginUser(req, res, next) {
  if (req.session.userId) {
    res.redirect("/home")
    return
  }
  next()
}

app.get('/', forLoginUser, (req, res) => {
  res.render('login')
})

app.get("/login", async (req, res) => {
  res.render("login")
})

app.post("/login", async (req, res) => {
  // console.log(req.body)
  let foundUser = await database.authenticateUser(req.body.email, req.body.password)
  // console.log(foundUser)
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



app.get('/api/products', async (req, res) => {
  try {
    let products = await database.getPosts(req.session.userId,req.session.userId)
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

app.get("/home", authorized, (req, res) => {
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
    let userId = req.session.userId
    let users = await database.getUser()
    let posts = await database.getPostByUser(userId)
    // console.log(posts)
    res.render("profile", { users, posts, userId })
  } catch (error) {
    console.error(error)
    res.status(500).send({ error: "error" })
  }
})


app.get("/createListing", authorized, async (req, res) => {
  try {
    let user = await database.getUserById(req.session.userId)
    res.render("createListing", { user, userId: req.session.userId })
  } catch (error) {
    console.error(error)
    res.status(500).send({ error: "🖕" })
  }
})

app.get("/likedItems", authorized, async (req, res) => {
  try {
    let id = req.session.userId
    let likeList = await database.getWishList(id)
    // console.log(likeList)
    res.render("likedItems", { likeList })
  } catch (error) {
    console.error(error)
    res.status(500).send({ error: "🖕" })
  }
})

// insert to wishlist, each person can only like 1 product 1 time
app.post('/likedItems', authorized, async (req, res) => {
  try {
    // let likeList = await database.getUserLikedItems()
    let userId = req.session.userId;
    let direction = req.body.dirX
    let productId = +req.body.productId
    //console.log('here:', userId, direction, productId)
    if (direction === 1) {
      // let addedToWishList = 
      await database.addToWishlist(userId, productId)
      // res.render('likedItems', {addedToWishList, likeList})
    }
    res.send({})
  } catch (error) {
    res.send({})
    // console.error('HELOOOOIO', error)
    // res.status(500).send({ error: "🖕" })
  }
})


app.get("/s3Url", async (req, res) => {
  try {
    const url = await generateUploadURL()
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
  let date = DateTime.now().toLocaleString(DateTime.DATETIME_MED).split(",").slice(0, -1).join(",")
  let image = axiosData.imageUrl;
  let user_id = req.session.userId;
  let category_id = 1;
  let condition_type_id = 1;
  let id = await database.insertPost(title, description, price, date, image, user_id, category_id, condition_type_id)
  res.json(id)
})

app.get('/editPost/:id', authorized, async (req, res) => {
  let users = await database.getUser()
  let postId = +req.params.id;
  let [post] = await database.getPost(postId)
  res.render('editPost', { post, users, userId: req.session.userId })
})


app.post('/editPost/:id', authorized, async (req, res) => {
  let postId = +req.params.id;
  let data = req.body;
  let title = req.body.title;
  let description = req.body.description;
  let price = req.body.price;
  let postImage = req.body.imageUrl;
  let userId = req.session.userId;
  let categoryId = req.body.category_id;
  let conditionTypeid = 1;
  await database.getPosts(postId)
  let id = await database.updatePost(postId, title, description, price, postImage, userId, conditionTypeid)
  res.json(postId)
})



app.get('/showProduct/:id', authorized, (req, res) => {
  let postId = +req.params.id;

  res.render('viewListing', { postId })
})


app.get("/viewListing/:id", async (req, res) => {
  let id = +req.params.id
  try {
    let posts = await database.getNewPost(id)
    let user = await database.getUserPostBy(posts[0].user_id)
    let images = await database.getImages(id)
    let inWishlist = await database.checkWishlist(req.session.userId, id)
    if (posts.length === 0) {
      res.status(404).send({ message: "this post doesn't exist" })
    } else {
      res.render(`viewListing`, { post: posts, inWishlist, user, images, userId: req.session.userId })
    }
  } catch (error) {
    console.error(error)
    res.status(500).send({ error: "🖕" })
  }
})

app.post("/addImage", async (req, res) => {
  database.insertImage(req.body.postId, req.body.imageUrl)
})

app.post("/deletePost/:id", async (req, res) => {
  let id = +req.params.id
  try {
    let result = await database.deletePost(id)
    res.redirect("/profile")
  } catch (error) {
    console.error(error)
    res.status(500).send({ error: "🖕" })
  }
})

app.post("/deleteImg", async (req, res) => {
  let result = await database.deleteOneImg(req.body.imageLink)
})

app.post("/removeWishedItem", async (req, res) => {
  await database.removeWishItem(req.body.wishid)
})


app.get("/chat", authorized, async (req, res) => {
  let user = await database.getUserById(req.session.userId)
  res.render("chat", { username: user.username })
});


app.get("/curentUserName", authorized, async (req, res) => {
  let user = await database.getUserById(req.session.userId)
  res.json({ username: user.username })
})

app.get("/editProfile", authorized, async (req, res) => {
  let user = await database.getUserById(req.session.userId)
  res.render("editProfile", { user })
})

app.post("/editProfile", authorized, async (req, res) => {
  await database.updateProfile(req.body.imageUrl, req.session.userId)
  res.json({})
})

app.post("/editName", authorized, async (req, res) => {
  await database.updateName(req.body.newName, req.session.userId)
  res.json({})
})
export default app;


app.post("/addWish", authorized, async (req, res) => {
  await database.addToWishlist(req.session.userId, req.body.postId)
})

app.post("/sellerid", authorized, async (req, res) => {

  let sellerId = req.body.sellerid
  let userId = req.session.userId

  let roomExist = await database.checkRoomExist(userId, sellerId)
  if (roomExist.length > 0) {
    res.send({ roomId: roomExist[0].room_id })
    return
  }
  if (roomExist.length === 0) {
    let roomId = await database.insertToRoom()
    if (roomId) {
      let sellerId = req.body.sellerid
      let userId = req.session.userId
      await database.insertToRoomUser(sellerId, roomId)
      await database.insertToRoomUser(userId, roomId)
      res.send({ roomId });
    }
  }
})

app.get("/chat/:roomId", authorized, async (req, res) => {
  try {
    let roomId = req.params.roomId
    let user = await database.getUserById(req.session.userId)
    let peopleInRoom = await database.getUsersByRoom(roomId)
    let otherUser = peopleInRoom.filter(n => {
      return n.user_id !== req.session.userId
    })
    let otherName = otherUser[0].username;
    let otherProfile = otherUser[0].profile_img;
    res.render("chat", {
      roomId,
      peopleInRoom,
      meName: user.username,
      otherName,
      otherProfile
    })
  } catch (error) {
    console.error(error)
    res.status(500).send({ error: "error" })
  }
})

app.get("/chatList", authorized, async (req, res) => {
  try{
  let chats = await database.getChatList(req.session.userId, req.session.userId)
  res.render("chatList", { chats })
  } catch (error) {
    console.error(error)
  }
})

app.post('/logout', (req, res) => {
  req.session = null
  res.redirect('/');
})

// app.post("/message", authorized, async (req, res) => {
//   let result = await database.getRoomUserId(req.body.roomId, req.session.userId)
//   let roomUser = result[0][0]
//   let roomUserId = roomUser.room_user_id
//   let dt = DateTime.now()
//   let now = dt.toLocaleString(DateTime.DATETIME_MED)
//   await database.insertMessage(req.body.message, now , roomUserId)
// })

