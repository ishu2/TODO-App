var bodyParser=require('body-parser');
var mongoose=require('mongoose');

// Connect to database
mongoose.connect('mongodb://test:test@ds163806.mlab.com:63806/todo');

//Create schema (blueprint for our schema)
var todoSchema=new mongoose.Schema({
    item:String
});

var Todo=mongoose.model('Tode',todoSchema);
var itemOne=Todo({item: 'buy shoes'}).save(function(err){
    if(err) throw err;
    console.log('item saved');
})

var data=[{ item: 'Get milk'} , { item : 'Walk dog'} , { item : 'Do some coding'}];
var urlencodedParser=bodyParser.urlencoded({extended : false});

module.exports=function(app){

app.get('/todo',function(req,res){
    res.render('todo',{todos : data});
});

app.post('/todo',urlencodedParser,function(req,res){
    data.push(req.body);
    res.json(data);
});

app.delete('/todo/:item',function(req,res){
   data=data.filter(function(todo){
       return todo.item.replace(/ /g, "-") !== req.params.item;
   });
   res.json(data);
});

}