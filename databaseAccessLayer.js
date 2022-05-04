const { post } = require("./app.js");

const database = require('./databaseConnection.js');
//const passwordPepper = "SeCretPeppa4MySal+";

async function getProducts() {
    let query = `
    SELECT post.post_id, post.title, post.description, post.price, image.url 
    FROM post
    JOIN image
    ON post.post_id = image.post_id;`
    const [rows] = await database.query(query)
    console.log(rows)
    return rows
}

async function getUserLikedItems() {
    let query = `
    SELECT user.user_id,user.username, post.title, post.description, image.url
    FROM user
    JOIN user_liked_post
    ON user.user_id = user_liked_post.user_id
    JOIN post
    ON user_liked_post.post_id = post.post_id
    JOIN image
    ON post.post_id = image.post_id;
    `
    const [rows] = await database.query(query)
    //console.log(rows)
    return rows
}

async function getUser(){
    let query =`
    SELECT user_id, username, profile_img 
    FROM user;  
    `
    const [rows] = await database.query(query)
    //console.log(rows)
    return rows
}

async function getMyPost(){
    let query=`
    SELECT user.user_id, user.username, post.title, image.url
    FROM user
    JOIN 
    post
    ON user.user_id= post.user_id
    JOIN 
    image
    ON post.post_id = image.image_id;
    `
    const [rows] = await database.query(query)
    //console.log(rows)
    return rows
}

module.exports = { getProducts, getUserLikedItems, getUser, getMyPost};

