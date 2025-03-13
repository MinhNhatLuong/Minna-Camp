if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

//Import library session
const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const localStrategy = require('passport-local');
const User = require('./models/user');

//Import Error handling session
const ExpressError = require('./utils/ExpressError');

//Import router session
const campgroundsRoute = require('./routes/campgroundsRoute');
const reviewsRoute = require('./routes/reviewsRoutes');
const usersRoute = require('./routes/usersRoute');

//Import mongoose sessions
const mongoose = require('mongoose');

main().catch(e => console.log(e))

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/myCamp');
    console.log("DATABASE CONNECTION OPEN!");
}

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, "public")));

const sessionConfig = {
    secret: "mySecretKey",
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 1000*60*60*24*7,
        maxAge: 1000*60*60*24*7,
        httpOnly: true
    }
} 

app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    // console.log(req.session);
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.currentUser = req.user;
    next();
})

app.get('/makeuser', async (req, res) => {
    const user = new User ({email: "luongminhnhat1604@gmail.com", username: "minhnhatlun2"});
    const newUser = await User.register(user, 'minhnhatpro');
    res.send(newUser);
})

app.use('/campgrounds', campgroundsRoute);
app.use('/campgrounds/:id/reviews/', reviewsRoute);
app.use('/', usersRoute);

app.get('/', (req, res) => {
    res.render('home');
})

app.all(/(.*)/, (req, res, next) => {
    next(new ExpressError('Page Not Found', 404));
})

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = "Something went wrong";
    res.status(statusCode).render('error', { err });
})

app.listen(3000, () => {
    console.log("LISTEN ON PORT 3000!");
})
