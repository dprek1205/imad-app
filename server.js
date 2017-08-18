
var express = require('express');
var morgan = require('morgan');
var path = require('path');
var crypto=require('crypto');
var Pool=require('pg').Pool;
var bodyParser=require('body-parser');
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

 

var pool= new Pool(config);

//create a pool thread globally so that its there for the life time

//make a connection pool create db config

var articles = {
'article-one' : {
    title: 'Article one | Rekha',
    heading: 'Article one',
    date:   'aug 01 2017',
    content: 
        `<p>
        Human race needs to fight the Aliens 
        Human need to build bouts carefuly so that they avoid wars between machines
        And beteen man & machine
    </p>
    <p>
        Human race needs to fight the Aliens 
        Human need to build bouts carefuly so that they avoid wars between machines
        And beteen man & machine
    </p>`
},
'article-two':{
    title: 'Article two | Deepa Rekha',
    heading: 'Article  two',
    date:   'aug 02 2017',
    content: 
        `<p>
        two Human race needs to fight the Aliens 
        two Human need to build bouts carefuly so that they avoid wars between machines
        two And beteen man & machine
    </p>
    <p>
        three Human race needs to fight the Aliens 
        three Human need to build bouts carefuly so that they avoid wars between machines
        three And beteen man & machine
    </p>`
},
'article-three': {
    title: 'Article three | Deepa',
    heading: 'Article three',
    date:   'aug 03 2017',
    content: 
        `<p>
        Human race needs to fight the Aliens 
        Human need to build bouts carefuly so that they avoid wars between machines
        And beteen man & machine
    </p>
    <p>
        Human race needs to fight the Aliens 
        Human need to build bouts carefuly so that they avoid wars between machines
        And beteen man & machine
    </p>`
    
}
};
//end ooint url
/*
app.get('/test-db',function(req,res){
    //alert('in end url get');
    //make req
    //create a response

    pool.query('select * from test',function(err,result){
        if (err){
            res.status(500).send(err.toString());
        }
        else {
            res.send(JSON.stringify(result.rows));
        }
        });
        
});
*/
app.get('/articles/:articleName',function(req,res){
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
    </div>
</body>
</html>`;
//returns html string
    return doctemp;
}
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.post('/create-user',function(req,res) {
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
   // yours alert('in server post'+username+password);
  // yours  alert('SELECT * FROM "user" WHERE username = $1',[username]);
    pool.query('SELECT * FROM "user" WHERE username = $1',[username],function(err,result){
        if (err)
        {
            res.status(500).send(err.toString());
        }
        else {
         if (result.rows.length === 0)
          {
              // yours res.send(403).send('1 username/password invalid'+username);
              res.send(403).send('username/password invalid');
          }
          else 
          {
           // yours   console.log('before dbstring'+result.rows[0].password);
           alert('1');
              var dbString = result.rows[0].password;
              var salt = dbString.spilt('$')[2];
                alert('2');
              
              //hash the user entered password after adding SALT & check this with what was stored in table
            // yours  console.log('before calling hash fn'+salt);
              
// yours              var hashedString=hash(password,salt);
              var hashedPassword = hash(password,salt);
              
                alert('3');
              //console.log('before comparing'+hashedString+":"+dbString);
              
              // yours if (hashedString === dbString){
              if (hashedPassword === dbString){
           alert('4');
                 res.send('credentials are corrrect');
              }
              else 
              {
                    alert('5');
                  res.send(403).send('2 username/password invalid');
              }
          }   
        }
        
    });
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
 var articleName=req.params.articleName;
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
