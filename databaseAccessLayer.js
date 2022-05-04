
const database = require('./databaseConnection.js');
//const passwordPepper = "SeCretPeppa4MySal+";

async function getPosts() {
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

async function getUser() {
    let query = `
    SELECT user_id, username, profile_img 
    FROM user;  
    `
    const [rows] = await database.query(query)
    //console.log(rows)
    return rows
}

async function getMyPost() {
    let query = `
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


async function addPost(title, description, price, user_id, condition_type_id, category_id) {
    let query = `INSERT INTO post (title, description, price, user_id, condition_type_id, category_id)  VALUES (?, ?, ?, ?, ?, ?)`
    const [result] = await database.query(query, [title, description, price, user_id, condition_type_id, category_id])
    const id = result.insertId
    const post = await getPosts(id)
    return post
}

module.exports = { getPosts, getUserLikedItems, getUser, getMyPost, addPost };

