const bodyParser = require('body-parser');
const express = require('express');
require('dotenv').config({ quiet:true });
const db = require('./configs/db');
const path = require('path');
const port = process.env.PORT || 8081;
const app = express();


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended:true }));
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));


app.use('/', require('./routers'))

app.listen(port, (err) => {
    if(!err){
        db();
        console.log(`Server start at -> http://localhost:${port}`);
    }
})