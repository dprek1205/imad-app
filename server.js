var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));
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
        ${date}
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
var counter=0;
app.get('/counter', function (req, res) {
counter+=1;
res.send(counter.toString());
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
