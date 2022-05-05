
const database = require('./databaseConnection.js');
//const passwordPepper = "SeCretPeppa4MySal+";

async function getPosts() {
    let query = `
    SELECT post.post_id, post.title, post.description, post.price, user.username, image.url 
    FROM post
    LEFT JOIN image
    ON post.post_id = image.post_id
    LEFT JOIN user
    ON post.user_id = user.user_id;`
    const [rows] = await database.query(query)
    return rows
}

async function getPost(id) {
    let query = `
    SELECT post.post_id, post.title, post.description, post.price, user.username, image.url 
    FROM post
    LEFT JOIN image
    ON post.post_id = image.post_id
    LEFT JOIN user
    ON post.user_id = user.user_id
    WHERE post.post_id = ?`
    const [rows] = await database.query(query, [id])
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
    return rows
}

async function getUser() {
    let query = `
    SELECT user_id, username, profile_img 
    FROM user;  
    `
    const [rows] = await database.query(query)
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
    return rows
}


async function addPost(title, description, price, user_id, condition_type_id, category_id, post_id, url) {
    let query1 =
        `INSERT INTO post (title, description, price, user_id, condition_type_id, category_id) VALUES (?, ?, ?, ?, ?, ?);`
    let query2 =
        `INSERT INTO image (post_id, url) VALUES (?, ?);`

    const [postResult] = await database.query(query1, [title, description, price, user_id, 1, 1])
    const postId = postResult.insertId
    const [imageResult] = await database.query(query2, [postId, "https://http.cat/404"])
    console.log(postResult, imageResult)

    const post = await getPost(postId) // i cahnged price to bar carcahr on workbench, change it back

    return post
}
// step 1: make that form an jax request and make sure everything is working with that ajax requiest
// step 2: query select for the form 


async function addToWishlist(user_id, post_id) {
let query = `INSERT INTO user_liked_post (user_id, post_id) VALUE (?, ?)`
const [likedItem] = await database.query(query, [user_id, post_id])
return likedItem
}

module.exports = { getPosts, getUserLikedItems, getUser, getMyPost, addPost, addToWishlist };
