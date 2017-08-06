console.log('Loaded!');
var ele=document.getElementById('main-text');
ele.innerHTML='appolo spacecraft';

var img=document.getElementById('madi');
var marginLeft=0;
var k=0;
/*function moveRight(){
    marginLeft+=1;
    img.style.marginLeft=marginLeft+'px';
}*/

img.onclick=function(){
    marginLeft+=10;
    img.style.marginLeft = marginLeft+'px';
  //var interval=setInterval(moveRight,50);
  k=k+1;
};

console.log('going to console');

