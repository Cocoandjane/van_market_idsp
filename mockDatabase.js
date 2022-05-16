class Database {
    users = {
        'emma': {
            username: 'Emma',
            password: 'emma',
            profile: "https://images.unsplash.com/photo-1503185912284-5271ff81b9a8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Z2lybHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=400&q=60"
        },
        'jane': {
            username: 'jane',
            password: 'coco',
            profile: "https://images.unsplash.com/photo-1503185912284-5271ff81b9a8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Z2lybHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=400&q=60"
        },
        'murad': {
            username: 'murad',
            password: 'fasting',
            profile: "https://images.unsplash.com/photo-1534614971-6be99a7a3ffd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Z3V5fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=400&q=60"
        }
    }



    products = [
        {
            "id": 1,
            "seller-name": "saM",
            "tittle": "t-shirt",
            "price": "$19.99",
            "description": "good looking white t-shirt, want it or not",
            "img": "https://cdn.pixabay.com/photo/2017/01/13/04/56/blank-1976334_1280.png"
        },
        {
            "id": 2,
            "seller-name": "Michael Jackson",
            "tittle": "pants",
            "price": "$19.99",
            "description": "good looking black pants, want it or not",
            "img": "https://media.istockphoto.com/photos/modern-womens-business-suit-picture-id1332743987?b=1&k=20&m=1332743987&s=170667a&w=0&h=Qem1BVt_P2Cy8pS87gMuFiL1x4qE4INHRg0cHp6le-o="
        },
        {
            "id": 3,
            "seller-name": "Michael Jackson",
            "tittle": "shoes",
            "price": "$19.99",
            "description": "good looking white shoes, want it or not",
            "img": "https://cdn.pixabay.com/photo/2016/11/19/18/06/feet-1840619__340.jpg"
        },


        {
            "id": 4,
            "seller-name": "Michael Jackson",
            "tittle": "mac book",
            "price": "$1299.09",
            "description": "I am a reasonable price, get me?",
            "img": "https://cdn.pixabay.com/photo/2015/11/19/11/45/macbook-pro-1050973__340.jpg"
        },
        {
            "id": 5,
            "seller-name": "Michael Jackson",
            "tittle": "head phones",
            "price": "$399.99",
            "description": "I am a bit expensive, but you decide i am worth it or not",
            "img": "https://media.istockphoto.com/photos/modern-professional-headphones-isolated-on-wooden-table-picture-id1222428599?b=1&k=20&m=1222428599&s=170667a&w=0&h=qiKLnklZvi3lZ9WXYkELOmxtN4hE9jxerBukAesJ2ms="
        },
        {
            "id": 6,
            "seller-name": "Michael Jackson",
            "tittle": "camera",
            "price": "$50",
            "description": "seconde hand camera, old school, you deserve me",
            "img": "https://cdn.pixabay.com/photo/2016/01/09/18/27/camera-1130731__480.jpg"
        }
    ]

    likedItems = [
        {
            "id": 1,
            "title": "phone case",
            "price": "$13.99",
            "description": "Magsafe for iPhone 13 - Coral",
            "img": "https://cdn.pixabay.com/photo/2020/11/22/11/53/iphone-12-5766344_1280.jpg"
        },
        {
            "id": 2,
            "title": "Shoes",
            "price": "$300",
            "description": "Nike Men's Running Shoes",
            "img": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bmlrZSUyMHNob2VzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60"
        },
        {

            "id": 3,
            "title": "Mac Air",
            "price": "$1289",
            "description": "Apple Macbook Air",
            "img": "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8YXBwbGUlMjBtYWNib29rJTIwYWlyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60"

        },
        {

            "id": 4,
            "title": "Apple Pen",
            "price": "$99.99",
            "description": "Apple pencil",
            "img": "https://images.unsplash.com/photo-1625864667442-60e49072dee0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8YXBwbGUlMjBwZW5jaWx8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60"

        },
        {
            "id": 5,
            "title": "head phone",
            "price": "$399.79",
            "description": "Apple AirPods (2nd Generation)",
            "img": "https://images.unsplash.com/photo-1605464315542-bda3e2f4e605?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8YWlycG9kc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60"
        }, 
        {
            "id": 6,
            "title": "iPad",
            "price": "$600",
            "description": "Apple iPad 5th Generation (Green)",
            "img": "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8aXBhZHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60"
        },
        {
            "id": 7,
            "title": "laptop",
            "price": "$859",
            "description": "HP Laptop",
            "img": "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8aHAlMjBsYXB0b3B8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60"
        },
        {
            "id": 8,
            "title": "Adaptor",
            "price": "$5",
            "description": "Charging Adaptor",
            "img": "https://media.istockphoto.com/photos/hand-turns-on-turns-off-charger-in-electrical-outlet-on-wall-picture-id1311832505?b=1&k=20&m=1311832505&s=170667a&w=0&h=M7ENDKx8ybpE0FJhQyaY95AqF-31OYxrnvwZAZWXdjY="
        },
        {

            "id": 9,
            "title": "Dyson",
            "price": "$220",
            "description": "Dyson V12 70% new",
            "img": "https://media.istockphoto.com/photos/house-cleaning-picture-id455293171?b=1&k=20&m=455293171&s=170667a&w=0&h=8I_hqH4A-6nTOIHueXG7VbJYcJ4Xl-3TPWTIyiBF6FY="

        },
        {

            "id": 10,
            "title": "iPad",
            "price": "$199.99",
            "description": "iPad Mini",
            "img": "https://images.unsplash.com/photo-1632633728838-d274fcb4e585?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8aXBhZCUyMG1pbml8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60"

        },
        {
            "id": 11,
            "title": "perfume",
            "price": "$150",
            "description": "JoMalone Wood Sage",
            "img": "https://fimgs.net/mdimg/perfume/375x500.25529.jpg"
        }, 
        {
            "id": 12,
            "title": "Diffuser",
            "price": "$30",
            "description": "Jo Malone Red Roses Diffuser",
            "img": "https://www.sephora.com/productimages/sku/s1947142-main-zoom.jpg?imwidth=315"
        },
        {
            "id": 13,
            "title": "Perfume",
            "price": "$169",
            "description": "Chanel Eau de Parfum Spray",
            "img": "https://images.unsplash.com/photo-1541643600914-78b084683601?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hhbmVsJTIwcGVyZnVtZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60"
        }, 
        {
            "id": 14,
            "title": "Perfume",
            "price": "$220",
            "description": "Chanel Eau de Parfum Spray",
            "img": "https://images.unsplash.com/photo-1588177925144-2fd3e4e7ce57?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8Y2hhbmVsJTIwcGVyZnVtZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60"
        },
        {
            "id": 15,
            "title": "Nail polish",
            "price": "$89",
            "description": "Chanel Longwear Nail Color - Red",
            "img": "https://cdn.cliqueinc.com/posts/285391/chanel-nail-polish-colors-285391-1581023899044-main.700x0c.jpg"
        }
    ]

    orders = [
        {
            "id": 4,
            "date": "Mar 25, 2022",
            "tittle": "mac book",
            "price": "$1299.09",
            "description": "I am a reasonable price, get me?",
            "img": "https://cdn.pixabay.com/photo/2015/11/19/11/45/macbook-pro-1050973__340.jpg"
        },
        {
            "id": 5,
            "date": "Mar 14, 2022",
            "tittle": "head phones",
            "price": "$399.99",
            "description": "I am a bit expensive, but you decide i am worth it or not",
            "img": "https://media.istockphoto.com/photos/modern-professional-headphones-isolated-on-wooden-table-picture-id1222428599?b=1&k=20&m=1222428599&s=170667a&w=0&h=qiKLnklZvi3lZ9WXYkELOmxtN4hE9jxerBukAesJ2ms="
        },
        {
            "id": 6,
            "date": "Feb 28, 2022",
            "tittle": "camera",
            "price": "$50",
            "description": "seconde hand camera, old school, you deserve me",
            "img": "https://cdn.pixabay.com/photo/2016/01/09/18/27/camera-1130731__480.jpg"
        }
    ]

    paidOrders = [
        {
            "id": 4,
            "date": "Mar 25, 2022",
            "tittle": "mac book",
            "price": "$1299.09",
            "description": "I am a reasonable price, get me?",
            "img": "https://cdn.pixabay.com/photo/2015/11/19/11/45/macbook-pro-1050973__340.jpg"
        },
        {
            "id": 5,
            "date": "Mar 14, 2022",
            "tittle": "head phones",
            "price": "$399.99",
            "description": "I am a bit expensive, but you decide i am worth it or not",
            "img": "https://media.istockphoto.com/photos/modern-professional-headphones-isolated-on-wooden-table-picture-id1222428599?b=1&k=20&m=1222428599&s=170667a&w=0&h=qiKLnklZvi3lZ9WXYkELOmxtN4hE9jxerBukAesJ2ms="
        },
        {
            "id": 6,
            "date": "Feb 28, 2022",
            "tittle": "camera",
            "price": "$50",
            "description": "seconde hand camera, old school, you deserve me",
            "img": "https://cdn.pixabay.com/photo/2016/01/09/18/27/camera-1130731__480.jpg"
        },
        {
            "id": 7,
            "date": "Feb 28, 2022",
            "tittle": "camera",
            "price": "$50",
            "description": "seconde hand camera, old school, you deserve me",
            "img": "https://cdn.pixabay.com/photo/2016/01/09/18/27/camera-1130731__480.jpg"
        }
    ]
    currentId = 7
    getProducts() {
        return this.products
    }

    getOrders() {
        return this.orders
    }

    getProductImg(id) {
        for (const product of this.products) {
            if (product.id === id) {
                return product.img
            }
        }
    }

    getEmma() {
        return this.users.emma
    }

    getLikedItems (){
        return this.likedItems
    }
    gerPaidOrders(){
        return this.paidOrders
    }    
}


module.exports = Database;
