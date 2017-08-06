console.log('Loaded!');
var ele=document.getElementById('main-text');
ele.innerHTML='appolo spacecraft';

var img=document.getElementById('madi');
var marginLeft=0;
var K=0;
/*function moveRight(){
    marginLeft+=1;
    img.style.marginLeft=marginLeft+'px';
}*/

img.onclick=function(){
    marginLeft+=10;
    img.style.marginLeft = marginLeft+'px';
  //var interval=setInterval(moveRight,50);
};
k++1;
    alert('k is '+k);

