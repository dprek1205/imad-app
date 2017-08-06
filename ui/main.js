console.log('Loaded!');
var ele=document.getElementById('main-text');
ele.innerHTML='appolo spacecraft';

var img=document.getElementById('madi');
function moveRight(){
    marginLeft+=1;
    img.style.marginLeft=marginLeft+'px';
}
img.onclick=function(){
  //  img.style.marginLeft = '100px';
  var interval=setInterval(moveRight,50);
};
