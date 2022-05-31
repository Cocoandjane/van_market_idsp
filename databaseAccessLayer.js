import database from './databaseConnection.js'
import bcrypt from "bcrypt";

export async function getPosts(userId, id) {
    let query = `
    SELECT user.username, user.user_id, post.*
    FROM post 
    JOIN user
    ON post.user_id = user.user_id
    WHERE post_id 
    NOT IN (SELECT post_id FROM wishlist WHERE wishlist.user_id = ?) AND post.user_id !=?;`
    const [rows] = await database.query(query, [userId, id])
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

export async function getWishList(id) {
    let query = `
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


export async function getPostByUser(id) {
    let query = `SELECT * FROM post
    WHERE user_id = ?;`
    const [posts] = await database.query(query, [id])
    return posts
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

export async function insertPost(title, description, price, date, image, user_id, category_id, condition_type_id, location_id ) {
    let query = "INSERT INTO post (title, description, price, date, post_image, user_id, category_id, condition_type_id, location_id ) VALUES (?,?,?,?,?,?,?,?,?);";
    const result = await database.query(query, [title, description, price, date, image, user_id, category_id, condition_type_id, location_id ])
    //console.log(result)
    const id = result[0].insertId
    return id
}

export async function insertImage(post_id, url) {
    let query = "INSERT INTO image(post_id, url)VALUES(?,?);"
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

export async function getUserPostBy(id) {
    let query = "SELECT * FROM user where user_id = ?;"
    const [user] = await database.query(query, [id])
    return user
}

export async function getImages(id) {
    let query = `select image.post_id, image.url
        from image
        WHERE image.post_id = ?;`
    const [images] = await database.query(query, [id])
    return images
}

export async function updatePost(postId, title, description, price, date, post_image,userId, categoryId,  conditionTypeid,location_id) {
    if (post_image) { }
    let query = `
    UPDATE post
     SET title = ?, description = ?, price = ?, date =?, post_image = ? , user_id = ?, location_id =?, condition_type_id = ?, location_id =?
    WHERE post_id = ?;
    `
    let [result] = await database.query(query, [postId, title, description, price, date, post_image, userId,categoryId,  conditionTypeid,location_id]) // do these have to be in the same order that they are in the sql statement
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

export async function deleteOneImg(url) {
    const query = `DELETE FROM image WHERE url= ?; `
    const result = await database.query(query, [url])
}

export async function checkWishlist(user_Id, post_Id) {
    const query = `SELECT * from wishlist 
    WHERE user_id=? and post_id=?;`
    const inWishlist = await database.query(query, [user_Id, post_Id])
    return inWishlist[0][0]
}

export async function removeWishItem(wishlist_id) {
    const query = `DELETE from wishlist 
    WHERE wishlist_id = ?;`
    const result = await database.query(query, [wishlist_id])
}

export async function getUserById(user_id) {
    const query = `SELECT user_id, username, profile_img FROM user WHERE user_id = ?`
    const user = await database.query(query, [user_id])
    return user[0][0]
}

export async function updateProfile(imageUrl, user_id) {
    const query = `UPDATE user 
    SET profile_img = ?
    WHERE user_id = ?;`
    const updated = database.query(query, [imageUrl, user_id])
    return updated
}

export async function updateName(username, user_id) {
    const query = `UPDATE user 
    SET username = ?
    WHERE user_id = ?;`
    const updated = database.query(query, [username, user_id])
    return updated
}


export async function insertToRoom() {
    const query = ` INSERT INTO room (start_datetime) VALUES(CURRENT_TIMESTAMP)`
    const result = await database.query(query)
    // console.log(result[0].insertId)
    const roomId = result[0].insertId
    return roomId;
}

export async function insertToRoomUser(user_id, room_id) {
    const query = `INSERT INTO room_user(user_id, room_id)
    VALUES(?,?);`
    const result = await database.query(query, [user_id, room_id])
    const roomUserId = result[0].insertId
    return roomUserId;
}

export async function getUsersByRoom(room_id) {
    const query = `
    SELECT  user.username, user.profile_img, room_user.room_user_id, room_user.user_id, room_user.room_id
    FROM user
    JOIN room_user
    ON user.user_id=room_user.user_id
    JOIN room
    ON room_user.room_id = room.room_id
    WHERE room.room_id =?;`
    const peopleInRoom = await database.query(query, [room_id])
    return peopleInRoom[0]
}

export async function getChatList(userId, id) {
    const query = `
    select user.username, user.user_id, user.profile_img, room_user.room_id, 
    room.latest_message, room.latest_time
    from user
    join room_user on room_user.user_id = user.user_id
    join room on room_user.room_id = room.room_id
    where user.user_id != ?
    AND room_user.room_id in
    (select room.room_id 
    from room
    JOIN room_user ON room_user.room_id = room.room_id
    where room_user.user_id = ?); `
    const chatList = await database.query(query, [userId, id])
    return chatList[0]
}

export async function checkRoomExist(myID, sellerId) {
    const query = `select count(room_user.room_id) total_users_in_room, room_user.room_id
    from room_user
    where user_id in (?, ?)
    group by room_user.room_id
    having total_users_in_room > 1;
    `
    const result = await database.query(query, [myID, sellerId])
    return result[0]
}

export async function getRoomUserId(roomId, userId) {
    const query = `
    SELECT * FROM room_user where room_id =? and user_id = ?;
    `
    const result = database.query(query, [roomId, userId])
    return result
}

export async function insertMessage(message, time, room_user_id) {
    const query = `
    INSERT INTO message (message, sent_datetime, room_user_id)
    VALUES(?,?,?)
    `
    const result = database.query(query, [message, time, room_user_id])
    return result
}

export async function getMessagesByRoom(roomId) {
    const query = `
    SELECT room_user.user_id, room_user.room_id, message.* 
    FROM room_user
    JOIN message
    ON room_user.room_user_id = message.room_user_id 
    WHERE room_id =?
    ORDER BY sent_datetime;
    `
    const result = database.query(query, [roomId])
    return result
}

export async function insertLatestMsg(message, time, roomId) {
    const query =`
    UPDATE room
    SET latest_message = ?,
    latest_time = ?
    WHERE room_id = ?;
    `
    const result = database.query(query, [message, time, roomId])
    return result
}




