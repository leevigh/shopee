const User = require('../models/user');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

// mongoose.Promise = Promise;

mongoose.connect('mongodb://localhost:27017/shopee', {
    // useMongoClient: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
})
.then(() => {
    console.log("connected successfully")
})
.catch(err => {
    console.log(err);
});

const admin = new User({
    firstName: 'Levi',
    lastName: 'Francis',
    email: 'francisking151@gmail.com',
    password: '123456',
    role: 'admin'
});

bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(admin.password, salt, function(err, hash) {
        if(err) {
            console.error(err);
        } else {
            admin.password = hash;
            admin.save()
            .then(() => {
                console.log("Admin saved successfully");
                mongoose.disconnect();
            })
            .catch(err => console.log(err));
        }
    })
})

// token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvaG5kb2VAZ21haWwuY29tIiwidXNlcklkIjoiNWZkYzc2NjlmZjUwNmI2MDUzZWVkN2E4IiwiaWF0IjoxNjA4NDkzMzkyLCJleHAiOjE2MDg0OTY5OTJ9.k79nmXnPre0M7FAeikzE92MOrS6ntB6md6tx0eSIoZ0"

// admin token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZyYW5jaXNraW5nMTUxQGdtYWlsLmNvbSIsInVzZXJJZCI6IjVmZGM2YTI4NmEzMjk5NGUyYjYwNDQ4YyIsImlhdCI6MTYwODQ5NDA1MSwiZXhwIjoxNjA4NDk3NjUxfQ.5OfQ8lxSbVJ-rdwvzieXfOPXZ9l8d_CQOr2N_Anhhgg"

// 
