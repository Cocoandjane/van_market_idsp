
//const database = require('./databaseConnection.js');
//const passwordPepper = "SeCretPeppa4MySal+";
import database from './databaseConnection.js'
import bcrypt from "bcrypt";
import { query } from 'express';

export async function getPosts() {
    let query = `
    SELECT post.post_id, post.title, post.description, post.price, post.post_image, post.user_id, user.username , user.profile_img
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

export async function getWishList(id){
    let query=`
    SELECT post.post_id, post.title, post.description, post.post_image, wishlist.user_id, user.username
    From post
    INNER JOIN wishlist
    ON post.post_id = wishlist.post_id
    INNER JOIN user
    ON wishlist.user_id = user.user_id
    WHERE user.user_id = ?
    ORDER BY timestamp desc;`
    const [rows] = await database.query(query, [id])
    return rows
}

export async function getUser() {
    let query = `
    SELECT user_id, username, email, profile_img 
    FROM user;  
    `
    const [users] = await database.query(query)
    return users
}

export async function getUserByEmail(email) {
    let query = ` SELECT user_id, username, email, password_salt
    FROM user
    WHERE email=?;
    `
    const [loginUser] = await database.query(query, [email])
    return loginUser
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

export async function insertPost(title, description, price, date, post_image, user_id, category_id, condition_type_id) {
    let query = "INSERT INTO post (title, description, price, date, post_image, user_id, category_id, condition_type_id) VALUES (?,?,?,?,?,?,?,?);";
    const result = await database.query(query, [title, description, price, date, post_image, user_id, category_id, condition_type_id])
    //console.log(result)
    const id = result[0].insertId
    return id
}

export async function insertImage(post_id, url){
    let query ="INSERT INTO image(post_id, url)VALUES(?,?);"
    const result = await database.query(query, [post_id, url])
    // const id = result[0].insertId
    // console.log(id)
    // return id
}

export async function addToWishlist(user_id, post_id) {
    let query = `INSERT INTO wishlist (user_id, post_id) VALUE (?, ?)`
    const [likedItem] = await database.query(query, [user_id, post_id])
    return likedItem
}

export async function getNewPost(id) {
    let query = "SELECT * FROM post where post_id = ?;"
    const [newPost] = await database.query(query, [id])
    return newPost
}

export async function getUserPostBy(id){
    let query = "SELECT * FROM user where user_id = ?;"
    const [user] = await database.query(query, [id])
    return user
}

export async function getImages(id){
    let query =`select image.post_id, image.url
        from image
        WHERE image.post_id = ?;`
        const [images]  = await database.query(query, [id])
        return images
    }

export async function updatePost(post_id, title, description, price, post_image, user_id, condition_type_id) {
    console.log("haha", post_id)
    if(post_image){}
    let query = `
    UPDATE post
     SET title = ?, description = ?, price = ?, post_image = ? , user_id = ?, condition_type_id = ?
    WHERE post_id = ?;
    `
    let [result] = await database.query(query, [title, description, price, post_image, user_id, condition_type_id, post_id]) // do these have to be in the same order that they are in the sql statement
    return result
}
export async function deletePost(id) {
    let query = "DELETE FROM post WHERE post_id = ?;"
    const result = await database.query(query, [id])
}



export async function createUser(username, email, plainPass) {
    const passwordHash = bcrypt.hashSync(plainPass, 8)
    let query = "INSERT INTO user(username, email, password_hash) VALUE(?,?,?);"
    const result = await database.query(query, [username, email, passwordHash])
    return passwordHash

}


export async function authenticateUser(email, password) {
    const query = 'SELECT * FROM user WHERE email = ?';
    const [foundUser] = await database.query(query, [email]);
    //console.log('here', foundUser)
    const authenticationResult = await bcrypt.compareSync(password, foundUser[0].password_hash);
    if (authenticationResult) {
        return foundUser;
    }
}

export async function deleteOneImg(url){
    const query = `DELETE FROM image WHERE url= ?; `
    const result = await database.query(query, [url])
}

export async function checkWishlist(user_Id, post_Id){
    const query = `SELECT * from wishlist 
    WHERE user_id=? and post_id=?;`
    const inWishlist = await database.query(query, [user_Id, post_Id])
    return inWishlist[0][0]
}

export async function removeWishItem(wishlist_id){
    const query =  `DELETE from wishlist 
    WHERE wishlist_id = ?;`
    const result = await database.query(query, [wishlist_id])
}