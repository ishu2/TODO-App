var bodyParser=require('body-parser');
var mongoose=require('mongoose');

// Connect to database
mongoose.connect('mongodb://test:test@ds163806.mlab.com:63806/todo');

//Create schema (blueprint for our schema)
var todoSchema=new mongoose.Schema({
    item:String
});

var Todo=mongoose.model('Tode',todoSchema);

var urlencodedParser=bodyParser.urlencoded({extended : false});

module.exports=function(app){

app.get('/todo',function(req,res){
   //   get data from MongoDB and p[ass it to view]
 
   // find all items in the database
   Todo.find({},function(err,data){
      res.render('todo',{todos : data});
   });   
   
});

app.post('/todo',urlencodedParser,function(req,res){

//   get data from view and add it to mongoDB
var newTodo=Todo(req.body).save(function(err,data){
    if(err) throw err;
    res.json(data);
})

});

app.delete('/todo/:item',function(req,res){

    Todo.find({item: req.params.item.replace(/\-/g," ")}).remove(function(err,data){
        if(err) throw err;
        res.json(data);
    })
    
});

}