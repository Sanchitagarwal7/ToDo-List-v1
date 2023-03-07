//jshint esversion:6

const bodyParser = require("body-parser");
const express = require("express");
const date = require(__dirname+'/date.js');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set('view engine', 'ejs');

let items = ['Buy Food', 'Cook Food', 'Eat Food'];
let workItems = [];

app.get('/', function(req, res){

    const today = date.getDate();

   res.render('list', {ListTitle: today, newListitems: items});
});

app.post('/', function(req, res){

    let item = req.body.new;

    if(req.body.button === 'Work'){
        workItems.push(item);
        res.redirect('/work');
    }else{
        items.push(item);
        res.redirect('/');
    }
});

app.get('/work', function(req, res){
    res.render('list', {ListTitle: 'Work', newListitems: workItems})
});

app.get('/about', function(req, res){
    res.render('about');
});

app.listen(3000, function(){
    console.log("Server is running on port 3000");
});