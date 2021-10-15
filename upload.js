//setting up an express server.

//load express
const express = require('express');
//load multer
const multer = require('multer');
const app = express();
const path = require('path');
// const fs = require('fs');


//mysql stuff
mysql = require('mysql')
bodyParser = require("body-parser");
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'marwan2',
    password: '*Sql3141*',
    database: 'teamSite'
});

connection.connect();
 
global.db = connection;

module.exports='upload.js'


// does not set the default export `upload.j`