// Imports the express package into your file
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');

const UserRoutes = require('./routes/UserRoutes');
const FeedRoutes = require('./routes/FeedRoutes');
const PageRoutes = require('./routes/PageRoutes');
const CompanyRoutes = require('./routes/CompanyRoutes');

const initPassportStrategy = require('./config/passport'); // function


// Create an express app
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(passport.initialize()); //passport
initPassportStrategy(passport); //passport-jwt


const db = process.env.MONGO_URI;
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

app.get( 
    '/feed/all',
    (req, res)=> {
        FeedModel.find()
        .then((users)=>{
            res.json(users);
        })
        .catch((err)=>console.log(err))
    }
);

app.use(
    '/feed',
    passport.authenticate('jwt', {session: false}),
    FeedRoutes
);

app.use(
    '/company',
    passport.authenticate('jwt', {session: false}),
    CompanyRoutes
);

app.use(
    '/',
    PageRoutes
);


app.listen(process.env.PORT || 3010, ()=>{
    console.log('You are connected!')
}) //http://127.0.0.1 (localhost)