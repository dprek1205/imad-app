console.log('Loaded!');

var loginb=document.getElementById("loginb");
var registerb=document.getElementById("registerb");

loginb.onclick=function(){
loginb.value=='Logging';

var  request=new XMLHttpRequest();    
    request.onreadystatechange=function(){
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                console.log('user logged in');
                alert(username.value+'logged in successfully');
                loginb.value='Logout';
                registerb.enabled=false;
            }
            else if (request.status === 403){
                alert('username/password incorrect 1 ');
            }
            else if (request.status === 500){
                alert('Unable to access server or duplicate');
        }
        }
    };

//var nameinp=document.getElementById("name");
//var name=nameinp.value;
var username=document.getElementById('username').value;
var password=document.getElementById('password').value;
console.log(username+":"+password);

request.open('POST','http://deepa042008.imad.hasura-app.io/login',true);

request.setRequestHeader('Content-Type', 'application/json');

request.send(JSON.stringify({username: username, password: password}));

};

registerb.onclick=function(){
registerb.value=='Registering';

var  request=new XMLHttpRequest();    
    request.onreadystatechange=function(){
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                console.log('user '+username.value +'has been registered');
                alert('logged in successfully');
                registerb.value=='Registered';
                username.style.display='block';
                password.style.display='block';
            }
            else if (request.status === 403){
                alert('username/password incorrect 1 ');
            }
            else if (request.status === 500){
                alert('something went wrong in server');
        }
        }
    };
 
var username=document.getElementById('username').value;
var password=document.getElementById('password').value;
console.log(username+":"+password);

request.open('POST','http://deepa042008.imad.hasura-app.io/register',true);

request.setRequestHeader('Content-Type', 'application/json');

request.send(JSON.stringify({username: username, password: password}));

};