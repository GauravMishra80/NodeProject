const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const mongoose = require('mongoose');

const app = express();

// Load Ideas Route
const ideas = require('./routes/ideas');
const users = require('./routes/users');

// Connect Mongoose
mongoose.connect('mongodb://localhost/NodeProject-db',{
  //  useMongoClient: true
})
.then(()=> console.log('Mongodb connected'))
.catch(err => console.log(err));



// Handlebars Middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

const port = 5000;
//Body Parser MiddleWare
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Set Public Folder
app.use(express.static(path.join(__dirname, 'public')));

// Method Override Middleware
app.use(methodOverride('_method'));

// Express Session
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

app.use(flash());

//global varaibles
app.use(function(req, res, next){
res.locals.success_msg = req.flash('success_msg');
res.locals.error_msg = req.flash('error_msg');
res.locals.error = req.flash('error');
next();
});

//Route For Index
app.get('/', (req, res)=>{
res.render('index');
});

app.get('/about', (req, res)=>{
    res.render('about');
    });

// Use Routes
app.use('/ideas', ideas);
app.use('/users', users);


app.listen(port, ()=>{
console.log(`App starting at port ${port}`);
});