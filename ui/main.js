console.log('Loaded!');
var element=document.getElementById('main-text');
element.innerHTML='This is SULTAN MIRZA';

var img=document.getElementById('mujahir');
var marginLeft=0;
 function moveRight(){
     marginLeft=marginLeft+1;
     img.style.marginLeft=marginLeft+'px';
 }
 img.onclick=function(){
     var interval=setInterval(moveRight,50);
 };
 