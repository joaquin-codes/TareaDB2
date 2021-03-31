require('./models/mongodb');

//Import the necessary packages
const express = require('express');
var app = express();
const path = require('path');
const exphb = require('express-handlebars');
const bodyparser = require('body-parser');

const courseController = require('./controllers/SkateController');
const gameController = require('./controllers/ScoreController')

app.use(express.static('public'));
app.use(bodyparser.urlencoded({
    extended: true
}));

//Create a welcome message and direct them to the main page

app.use(bodyparser.json());

//Configuring Express middleware for the handlebars
app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', exphb({ extname: 'hbs', defaultLayout: 'mainLayout', layoutDir: __dirname + 'views/layouts/' }));
app.set('view engine', 'hbs');

//Set the Controller path which will be responding the user actions

app.use('/course', courseController);


//Establish the server connection--------------------------------
//PORT ENVIRONMENT VARIABLE

app.listen(3000, () => console.log(`Listening`));

