const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const path = require('path');

const connectDB = require('./server/database/connection');


const app = express();

dotenv.config({path:'config.env'});
const PORT = process.env.PORT || 8080; 

// log requests
app.use(morgan('tiny'));

// mongoDB Connection
connectDB();

// parse requests to body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// set view engine
app.set('view engine', 'ejs');
// app.set('views', path.resolve(__dirname, 'views/ejs'))

// load assets
app.use('/css', express.static(path.resolve(__dirname,'public/css')));
app.use('/img', express.static(path.resolve(__dirname,'public/img')));
app.use('/js', express.static(path.resolve(__dirname,'public/js')));


// load routers
app.use('/', require('./server/routes/router'));


app.listen(PORT, () => {
    console.log(`Server now running on port http://localhost:${PORT}...`);
});