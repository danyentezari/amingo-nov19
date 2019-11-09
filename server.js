// Imports the express package into your file
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const UserRoutes = require('./routes/UserRoutes');
const FeedRoutes = require('./routes/FeedRoutes');
const PageRoutes = require('./routes/PageRoutes');


// Create an express app
const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const db = 'mongodb+srv://danyentezari:12345@cluster0-v8v8h.mongodb.net/test?retryWrites=true&w=majority';
mongoose
.connect(db, {useNewUrlParser: true, useUnifiedTopology: true}) //Promise
.then(()=>{
    console.log('DB is connected');
})
.catch((err)=>{
    console.log('error', err)
});
 
app.use(
    '/users', // http://example.com/users/...
    UserRoutes
);

app.use(
    '/feed',
    FeedRoutes
);

app.use(
    '/',
    PageRoutes
);


app.listen(3000, ()=>{
    console.log('You are connected!')
})