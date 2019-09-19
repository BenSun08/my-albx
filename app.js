const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
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
app.use(session({
    secret: 'aliBitch',
    resave:false,
    saveUninitialized:false
}));
//validate the login status
app.use((req,rsp,next)=>{
    if((req.session.isLogin && req.session.isLogin == 'yes') || 
    !/admin/.test(req.url) || req.url == '/admin/login'){
        next();
    }else{
        rsp.redirect('/admin/login');
    }
});

app.use(router);