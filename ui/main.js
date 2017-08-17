console.log('Loaded!');


//capture the resp & store 
//render the var in span
/*
var button=document.getElementById('counter');
var counter=0;
button.onclick= function(){
    //create a request to web server
    var  request=new XMLHttpRequest();
    request.onreadystatechange=function(){
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                var counter=request.responseText;
                var span=document.getElementById('count');
                span.innerHTML=counter.toString();
            }
        }
        
    };
    */
    /*end of onready*/
    
//make a request to counter endpoint
/*
request.open('GET',"http://deepa042008.imad.hasura-app.io/counter",true);
request.send(null);
};
var submit=document.getElementById("submit_btn");
submit.onclick=function(){
  //  var names=['name1','name2','name3','name4'];
    var  request=new XMLHttpRequest();
    request.onreadystatechange=function(){
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                var names=request.responseText;
                //converts string i.e responsetext to an object 
                names=JSON.parse(names);
                var list='';
                for(var i=0;i<names.length;i++)
                {
                    list+='<li>'+names[i]+'</li>';
                }
                var ul=document.getElementById("namelist");
                ul.innerHTML=list;
                
            }
        }

    };
    */
    
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
request.setRequestHeader('Content-Type','application/json');

//request.open('GET','http://deepa042008.imad.hasura-app.io/submit-name?name='+name,true);
request.open('POST','http://deepa042008.imad.hasura-app.io/login',true);
request.send(JSON.stringfy({username:username,password:password}));
};