console.log('Loaded!');

//make a request to counter endpoint
//capture thre sp *& store in var
//render the var in span
var button=document.getElementById('counter');
button.onclick= function(){
    counter++;
    var span=document.getElementById('count');
    span.innerHTML=counter.toString();
    
};
