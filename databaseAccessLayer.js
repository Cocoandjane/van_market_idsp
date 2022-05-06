
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
    //console.log(rows)
    return rows
}

export async function getPost(id) {
    let query = `
    SELECT post.post_id, post.title, post.description, post.price, user.username, image.url 
    FROM post
    LEFT JOIN image
    ON post.post_id = image.post_id
    LEFT JOIN user
    ON post.user_id = user.user_id
    WHERE post.post_id = ?`
    const [rows] = await database.query(query, [id])
    //console.log(rows)
    return rows
}

export async function getUserLikedItems() {
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

export async function getUser() {
    let query = `
    SELECT user_id, username, profile_img 
    FROM user;  
    `
    const [rows] = await database.query(query)
    //console.log(rows)
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
    //console.log(rows)
    return rows
}


export async function addPost(title, description, price, user_id, condition_type_id, category_id, post_id, url) {
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


export async function insertPost(postData, cb) {
    let sqlInsertSalt = "INSERT INTO post (title, description, price, post_image, user_id, category_id, condition_type_id ) VALUES (:title, :description, :price, :post_image, :user_id, :category_id, :condition_type_id);";
    let params = {
        title: postData.title,
        description: postData.description,
        price: postData.price,
        post_image: postData.imageUrl,
        category_id: 1,
        user_id: 1,
        condition_type_id: 1
        
    };
   await database.query(sqlInsertSalt, params, (err, results, fields) => {
        if (err) {
            console.log(err);
            callback(err, null);
        } else {

            callback(null, results);
        }
    })
}

export async function addToWishlist(user_id, post_id) {
    let query = `INSERT INTO user_liked_post (user_id, post_id) VALUE (?, ?)`
    const [likedItem] = await database.query(query, [user_id, post_id])
    return likedItem
    }
// async function inserPost(title, )
// step 1: make that form an jax request and make sure everything is working with that ajax requiest
// step 2: query select for the form 
//module.exports = { getPosts, getUserLikedItems, getUser, getMyPost, addPost, insertPost };
