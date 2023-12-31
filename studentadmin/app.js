require('dotenv').config();

const express = require('express');
const expressLayout = require('express-ejs-layouts');
const methodOverride = require('method-override');
const connectDB = require('./server/config/db');
const app = express();
const port = 5000 || process.env.PORT;

//connect to database
connectDB();

app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(methodOverride('_method'));

//static files
app.use(express.static('public'));


//templating engine
app.use(expressLayout);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');


//routes
app.use('/', require(`./server/routes/student`));


//404
app.get('*',(req, res) => {
    res.status(404).render('404');
});

app.listen(port, () => {
    console.log(`inside port ${port}`)
});
