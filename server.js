var express = require('express');
var morgan = require('morgan');
var path = require('path');
var crypto=require('crypto');
var Pool=require('pg').Pool;
var bodyParser=require('body-parser');
//USING EXPRESS session library. everytome the server.js is restarted session object dies
var session=require('express-session');

var config = {
    user:'deepa042008',
    database:'deepa042008',
    host:'db.imad.hasura-app.io',
    port:5432,
    password:process.env.DB_PASSWORD
    };

var app = express();

app.use(morgan('combined'));
app.use(bodyParser.json());

//app to use the session libr, 2 config to be given: value to encrypt with, life of the cookie
app.use(session({
    secret:'someRandomSecretValue',
    //60 sec ;60 min =1 hr  ;24 - 1 day; 30 - no of days ; 1 month life
    cookie:{maxAge:1000*60*60*24*30}
}));
 

var pool= new Pool(config);

app.get('/articles/:articleName',function(req,res){
    
    if (req.session && req.session.auth && req.session.auth.userId) {
        pool.query("select * from article where title=$1",[req.params.articleName],function(err,result){
        if (err){
            res.status(500).send(err.toString());
        }
         else {   
        html_ed='<p> Submit a comment<input type="text" id="Comment" style="width=300px"/> <input type="submit" id="Submit" />';
        pool.query("select comment from comment , article where comments.article_id=comment.article_id and article.title=$1",[req.params.articleName],function(err,result){
        
        if (err ||  (result.rows.length === 0)) {
            res.send(create_ed_doc(articleData,html_ed));
        }
        else 
        {
         var list_ele='';
         for (var i=0;i< result.rows.length;i++)
         {
            list_ele='<li>'+result.rows[i]+'</li>';
         }
         html_ed='</p><ui id='+list_ele+'</ui>';
         res.send(create_ed_doc(articleData,html_ed));
        }
    });
    }
        });
    }
    else {    
    
    //alert('in end url get');
    //make req
    //create a response
    //pool.query("select * from article where title='"+req.params.articleName+"'",function(err,result){
    pool.query("select * from article where title=$1",[req.params.articleName],function(err,result){
        if (err){
            res.status(500).send(err.toString());
        }
        else {
            if (result.rows.length === 0){
                res.status(404).send('article not found');
            }
            else {
                  var articleData=result.rows[0];
                  res.send(createart(articleData));
                 }
        }
        });
    }
});


//takes a document obj
function createart (doc) {
    var title=doc.title;
    var heading=doc.heading;
    var date=doc.date;
    var content=doc.content;
    
    var doctemp=`
    <html>
    <head>
    <title>
        ${title}
    </title>
    <meta name="viewport" content="width-device-width,inital-scale-1"/>
    <link href="ui/style.css" rel="stylesheet"/>
    </head>
<body>
    <div class="container">
    <div>
        <a href="/">Home</a>
        </div>
    <hr/>
    <h3>
        ${heading}
    </h3>
    <div>
        ${date.toDateString()}
    </div>
    <div>
    ${content}
    </div>
    <h2>Comments</h2>
    </div>
</body>
</html>`;
//returns html string
    return doctemp;
}

function create_ed_doc (doc,html_ed) {
    var title=doc.title;
    var heading=doc.heading;
    var date=doc.date;
    var content=doc.content;
    var html_var=html_ed;
    
    var doctemp=`
    <html>
    <head>
    <title>
        ${title}
    </title>
    <meta name="viewport" content="width-device-width,inital-scale-1"/>
    <link href="ui/style.css" rel="stylesheet"/>
    </head>
<body>
    <div class="container">
    <div>
        <a href="/">Home</a>
        </div>
    <hr/>
    <h3>
        ${heading}
    </h3>
    <div>
        ${date.toDateString()}
    </div>
    <div>
    ${content}
    </div>
    <h2>Comments</h2>
     ${hmtl_var}
    </div>
    </div>
</body>
</html>`;
//returns html string
    return doctemp;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.post('/register',function(req,res) {
    var username=req.body.username;
    var password=req.body.password;
    var salt=crypto.randomBytes(128).toString('hex');
    var dbstring=hash(password,salt);
  pool.query('INSERT INTO "user" (username,password) values($1,$2)',[username,dbstring],function(err,result){
        if (err){
            res.status(500).send(err.toString());
        }
        else {
              res.send('user created successfully ' + username);
            }
      
  });
    
});

//fetches the user entered username,password & checks if its correct & present in db user table
app.post('/login',function(req,res){
    var username = req.body.username;
    var password=req.body.password;
    pool.query('SELECT * FROM "user" WHERE username = $1',[username],function(err,result){
        if (err)
        {
            res.status(500).send(err.toString());
        }
        else {
         if (result.rows.length === 0)
          {
              // yours res.send(403).send('1 username/password invalid'+username);
              
              res.status(403).send('username/password invalid');
          }
          else 
          {

              var dbString = result.rows[0].password;
              var salt = dbString.split('$')[2];
    
              //hash the user entered password after adding SALT & check this with what was stored in table
            // yours  console.log('before calling hash fn'+salt);
        
              var hashedPassword = hash(password,salt);
              
        
              
              
        
              if (hashedPassword === dbString){
//set the session value before sending the response.The session libr creates a session object for the request
//user id table. auth is key in session object. 
                 if (req.session && req.session.auth && req.session.auth.userId) {
                     res.status(201).send('ALREADY LOGGED IN');
                 }
                 else{
                 req.session.auth={userId:result.rows[0].id};
                 }
                 //session middleware is setting a cookie with a randomly generated cookie. maps session id to an object with value which in turn contains userId object. 
                 //express session libr ensures that the session token.userid combination for the domain is saved as soon as the response is sent
                 
                 res.send('credentials are corrrect');
              }
              else 
              {
        
                  res.status(403).send('2 username/password invalid');
              }
          }   
        }
        
    });
});

//create another end point  to check the session persistence

app.get('/check-login',function(req,res){
if (req.session && req.session.auth && req.session.auth.userId) {
    res.send('You are logged in' + req.session.auth.userId.toString());
}
else{
    res.send('You are not logged in');
}


});

app.get('/logout',function(req,res){
  delete req.session.auth;  
  res.send('logged out');
});
    
function hash(input,salt){
    var hashed= crypto.pbkdf2Sync(input,salt,10000,512,'sha512');
    //crypto.pbkdf2('secret', 'salt', 100000, 512, 'sha512', (err, derivedKey)
    //password paste key derivation function. input+salt string hashed 10000 times. 1st hash is 512 bytes. that hashed o/p is rehashed
    //sha512 - openssl alg
    //choose salt string randomly generated salt string.  even user chooses commonly used password, this random string will protect hackers
   //  return hashed.toString('hex');
     return ["pbkdf","10000",salt,hashed.toString('hex')].join("$");
}

//create password hassing end point.takes i/p as part of url & returns a string that represents the manner password will be stored
app.get('/hash/:input',function(req,res){
    var salt='this-is-a-random-string';
    var hashedString=hash(req.params.input,salt);
    res.send(hashedString);
});

var counter=0;
app.get('/counter', function (req, res) {
counter+=1;
res.send(counter.toString());
});
var names=[];
app.get('/submit-name',function(req,res){
var name=req.query.name;
names.push(name);
res.send(JSON.stringify(names));
});

//app.get('/article-one', function (req, res) {

  //res.send('article one will be served here');
 //  res.sendFile(path.join(__dirname, 'ui', 'article-one.html'));
 app.get('/:articleName', function (req, res) {
  articleName=req.params.articleName;
 res.send(createart(articles[articleName]));
});

/*
app.get('/article-two', function (req, res) {
 res.send('article two will be served here');
   res.sendFile(path.join(__dirname, 'ui', 'article-two.html'));
 res.send(createart(articletwo));
});
app.get('/article-three', function (req, res) {
  res.send('article three will be served here');
  res.sendFile(path.join(__dirname, 'ui', 'article-three.html'));
  res.send(createart(articlethree));
});

app.get('/ui/main.js', function(req,res){
    res.sendFile(path.join(_dirname, 'ui', 'main.js'));
    
});
*/
app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
