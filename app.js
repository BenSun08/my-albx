const express = require('express');
const bodyParser = require('body-parser');
const router = require('./router');
const app = express();

const host = '127.0.0.1';
const port = 6004;

app.listen(port,host,()=>{
    console.log("Hello, bitch!");
    console.log("http://127.0.0.1:6004");
});

app.set("view engine", 'ejs');
app.set('views', 'views');

app.use('/assets', express.static('assets'));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({extended:false}));

app.use(router);