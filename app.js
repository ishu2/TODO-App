var express=require('express');
var todoController=require('./routes/todoController');

var app=express();

// Set template engine
app.set('view engine','ejs');

// Static files
app.use(express.static('./public'));

//fire controllers (routes)
todoController(app);

app.listen(2000);