var express = require('express'); //importing all items of express
var bodyParser = require('body-parser');
var path = require('path');
var mongojs = require('mongojs');
var db = mongojs('contactsapp', ['users']);
var ObjectId= mongojs.ObjectId;

var app = express(); //initalize any variables with express
//middleware: should be before route handler
/*var logger = function(req, res, next){
    console.log('logging...');
    next();
}
app.use(logger);
*/

// This is view Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); //determine path of views
//Body parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//set static path
app.use(express.static(path.join(__dirname, 'public'))) //determine path for static files



app.get('/', function(req, res){
    db.users.find(function (err, docs) {
       console.log(docs);
       res.render('index', {
           title: 'Contacts',
           users: docs
        });   
    // docs is an array of all the documents in mycollection
    })

    
   
});

app.post('/users/add',function(req, res){
    var newUser= {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        Phone_no: req.body.Phone_no
    }
    db.users.insert(newUser, function(err,result){
       if(err){
           console.log(err);
       }
        res.redirect('/');
    });

   
});

app.delete('/users/delete/:id', function(req, res){
db.users.remove({_id: ObjectId(req.params.id)}, function(err, result ){
    if(err){
        console.log(err);
    }
    res.redirect('/');
});
});


app.listen(3000, function(){
    console.log('server started on port 3000...');
})


