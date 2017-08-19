console.log('Loaded!');

var loginb=document.getElementById("loginb");
var registerb=document.getElementById("registerb");

//ONCLICK FOR LOGIN BUTTON

loginb.onclick=function(){


var  request=new XMLHttpRequest();    
if (loginb.value === 'Login') {
  login_fn() ;
}
 else {
  logout_fn();
}
};

//ONCLICK FOR REGISTER BUTTON

registerb.onclick=function(){
registerb.value=='Registering';

var  request=new XMLHttpRequest();    
    request.onreadystatechange=function(){
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                console.log('user '+username +'has been registered');
                alert('logged in successfully');
                registerb.value=='Registered';
                username.style.display='block';
                password.style.display='block';
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

function fn_login() {

      loginb.value=='Logging';
       request.onreadystatechange=function(){
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 201) {
                alert(username  + 'already logged in');
                loginb.value='Logout';
                registerb.enabled=false;
                username.style.display='block';
                password.style.display='block';
                username.innerHTML='Hi '+username.value;
            }

               else if (request.status === 200) {
                alert(username +'logged in successfully');
                loginb.value='Logout';
                registerb.enabled=false;
                username.style.display='block';
                password.style.display='block';
                username.innerHtmlElement='Hi '+username.value;
                
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
}

function fn_logout() {

       request.onreadystatechange=function(){
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                alert(username+ 'logged out');
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
}