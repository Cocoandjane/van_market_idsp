
//const database = require('./databaseConnection.js');
//const passwordPepper = "SeCretPeppa4MySal+";
import database from './databaseConnection.js'

export async function getPosts() {
    let query = `
    SELECT post.post_id, post.title, post.description, post.price, post.post_image, user.username
    FROM post
    LEFT JOIN user
    ON post.user_id = user.user_id
    ORDER BY post.post_id DESC;`
    const [rows] = await database.query(query)
    return rows
}

export async function getPost(id) {
    let query = `
    SELECT  post.user_id, post.post_id, post.title, post.description, post.price, user.username, post.post_image
    FROM post
    LEFT JOIN image
    ON post.post_id = image.post_id
    LEFT JOIN user
    ON post.user_id = user.user_id
    WHERE post.post_id = ?`
    const [rows] = await database.query(query, [id])
    return rows
}

export async function getUserLikedItems() {
    let query = `
    SELECT user.user_id,user.username, post.title, post.description, post.post_image FROM user, post, wishlist
    WHERE user.user_id = 1 AND wishlist.user_id = user.user_id AND wishlist.post_id = post.post_id
    `
    const [rows] = await database.query(query)
    return rows
}

export async function getUser() {
    let query = `
    SELECT user_id, username, profile_img 
    FROM user;  
    `
    const [rows] = await database.query(query)
    return rows
}

export async function getMyPost() {
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


// export async function addPost(title, description, price, user_id, condition_type_id, category_id, post_id, url) {
//     let query1 =
//         `INSERT INTO post (title, description, price, user_id, condition_type_id, category_id) VALUES (?, ?, ?, ?, ?, ?);`
//     let query2 =
//         `INSERT INTO image (post_id, url) VALUES (?, ?);`

//     const [postResult] = await database.query(query1, [title, description, price, user_id, 1, 1])
//     const postId = postResult.insertId
//     const [imageResult] = await database.query(query2, [postId, "https://http.cat/404"])
//     console.log(postResult, imageResult)

//     const post = await getPost(postId) // i cahnged price to bar carcahr on workbench, change it back

//     return post
// }

// export async function addTask(title) {
//     let query = `INSERT INTO tasks (title) VALUES (?)`
//     const result = await pool.query(query, [title]) 
//     console.log(result)
//     const id = result[0].insertId
//     return getTask(id)
// }


export async function insertPost(title, description, price, date, post_image, user_id, category_id, condition_type_id){
    let query = "INSERT INTO post (title, description, price, date, post_image, user_id, category_id, condition_type_id) VALUES (?,?,?,?,?,?,?,?);";
    const result = await database.query(query, [title, description, price, date, post_image, user_id, category_id, condition_type_id])
    //console.log(result)
    const id = result[0].insertId
    return id
}
   

export async function addToWishlist(user_id, post_id) {
let query = `INSERT INTO wishlist (user_id, post_id) VALUE (?, ?)`
const [likedItem] = await database.query(query, [user_id, post_id])
return likedItem
}

export async function  getNewPost(id) {
    let query = "SELECT * FROM post where post_id = ?;"
    const [newPost] = await database.query(query, [id])
    return newPost  
}

export async function deletePost(id) {
    let query="DELETE FROM post WHERE post_id = ?;"
    const result = await database.query(query, [id])
}
