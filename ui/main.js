console.log('Loaded!');
//var ele=document.getElementById('main-text');
//ele.innerHTML='appolo spacecraft';

//make a request to counter endpoint
//capture thre sp *& store in var
//render the var in span
var counter=document.getElementById('counter');
button.onclick= function(){
    counter++;
    var span=document.getElementById('count');
    span.innerHTML=counter.tostring();
};
