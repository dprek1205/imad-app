console.log('Loaded!');

var loginb=document.getElementById("loginb");
var registerb=document.getElementById("registerb");

//ONCLICK FOR LOGIN BUTTON

loginb.onclick=function(){
    
var id1=document.getElementById('id1');
var  request=new XMLHttpRequest();    
     loginb.value=='Logging';
       request.onreadystatechange=function(){
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 201) {
                alert(username  + 'already logged in');
                loginb.value='Logout';
                document.getElementById('registerb').setAttribute('disabled',true);
                
                //  username.style.display='block';
                //password.style.display='block';
                //username.innerHTML='Hi '+username.value;
                id1.innerHTML='Hi' +username+'<p> Logout <a href="/logout">Logout</a> </p>';
            }

               else if (request.status === 200) {
                alert(username +'logged in successfully');
                loginb.value='Logout';
                document.getElementById('registerb').setAttribute('disabled',true);
                id1.innerHTML='<div>Hi' +username+'<p> Logout <a href="/logout">Logout</a> </p></div>';
            }
            else if (request.status === 403){
                alert('username/password incorrect 1 ');
            }
            else if (request.status === 500){
                alert('Unable to access server 500');
        }
        }
        };
var username=document.getElementById('username').value;
var password=document.getElementById('password').value;
console.log('in register '+username+':'+password);

request.open('POST','http://deepa042008.imad.hasura-app.io/login',true);

request.setRequestHeader('Content-Type', 'application/json');

request.send(JSON.stringify({username: username, password: password}));
    
};

//ONCLICK FOR REGISTER BUTTregisterb.onclick=function(){
registerb.onclick=function(){
// yours registerb.value=='Registering';
registerb.value='Register';


var  request=new XMLHttpRequest();    
    request.onreadystatechange=function(){
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                console.log('user '+username +'has been registered');
                alert('logged in successfully');
                registerb.value=='Registered';
            }
            else if (request.status === 403){
                alert('username/password incorrect 1 ');
            }
            else if (request.status === 500){
                alert('Unable to connect to Server or duplicate id 500');
        }
        }
    };
 
var username=document.getElementById('username').value;
var password=document.getElementById('password').value;
console.log('in login '+username+':'+password);

request.open('POST','http://deepa042008.imad.hasura-app.io/register',true);

request.setRequestHeader('Content-Type', 'application/json');

request.send(JSON.stringify({username: username, password: password}));

};

$('#logout').click(function(){
    var id1=document.getElementById('id1');
       request.onreadystatechange=function(){
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                alert(username+ 'logged out');
                
                  id1='<input type="text" id="username" placeholder="username"/> <input type="password" id="password"/>';
                  loginb.value=='Login';
                 registerb.enabled=true;
                 res.send('<html> <body> Logged out <a href="/">Back to Home</a> </body></html>');
               }
            else {
                alert('Unable to access server 500');
                 }
        }
    };

var username=document.getElementById('username').value;
var password=document.getElementById('password').value;
console.log('in logout '+ username+":"+password);

request.open('POST','http://deepa042008.imad.hasura-app.io/logout',true);

request.setRequestHeader('Content-Type', 'application/json');

request.send(JSON.stringify({username: username, password: password}));
});

$('#?').click(function(){
    var  request=new XMLHttpRequest();    
    var name='?';
    request.open('GET','http://deepa042008.imad.hasura-app.io/articles',name,true);
    
});

//submit comments
submit.onclick=function(){
submit.value=='submitting';

var  request=new XMLHttpRequest();    
    request.onreadystatechange=function(){
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                var names=request.responseText;
                names=JSON.parse(names);
                var list='';
                for (var j=0;j<names.length;j++){
                    list='<li>'+name[j]+'</li>';
                }
                var li=docment.getElementById('list_ele');
                 li.innerHTML=list;
            }
            else {
                alert('Unable to access server '+request.status.toString());
            }
            
                
        }
    };
 
var comments=document.getElementById('comment').value;
var title=document.getElementById('title').value;
request.open('POST','http://deepa042008.imad.hasura-app.io/submit',true);
request.setRequestHeader('Content-Type', 'application/json');
request.send(JSON.stringify({title: title, comment: comment}));
};
