console.log('Loaded!');

var submit=document.getElementById("submit_btn");

submit.onclick=function(){

var  request=new XMLHttpRequest();    
    request.onreadystatechange=function(){
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                console.log('user logged in');
                alert('logged in successfully');
            }
            else if (request.status === 403){
                alert('username/password incorrect 1 ');
            }
            else if (request.status === 500){
                alert('something went wrong in server');
        }
        }
    };

//var nameinp=document.getElementById("name");
//var name=nameinp.value;
var username=document.getElementById('username').value;
var password=document.getElementById('password').value;
console.log(username+":"+password);


//request.open('GET','http://deepa042008.imad.hasura-app.io/submit-name?name='+name,true);
request.open('POST','http://deepa042008.imad.hasura-app.io/login',true);
request.setRequestHeader('Content-Type', 'application/json');
request.send(JSON.stringify({username: username, password: password}));
};