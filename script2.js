var url=window.location.href;//url of the window
var id=url.split("#").pop();//getting id of the hero
var xhr=new XMLHttpRequest();//XML to get image
xhr.onload=function(){
    var imageobj=JSON.parse(xhr.response);
    var url=imageobj.url;
    document.getElementById('image').setAttribute('src',url);
}
xhr.open('get',`https://www.superheroapi.com/api.php/2163050803820238/${id}/image`,true);
xhr.send();
var xhrreq=new XMLHttpRequest();//XML to get other relevant data
xhrreq.onload=function(){
    var heroinfo=JSON.parse(xhrreq.response);
    var heroname=heroinfo.name;
    var power=heroinfo.powerstats;
    var bio=heroinfo.biography;
    var app=heroinfo.appearance;
    document.getElementById('fullname').innerText=`Name : ${heroname}`;
    document.getElementById('powerCombat').innerText=`Strength : ${power.strength}`;
    document.getElementById('totalpower').innerText=`Power : ${power.power}`;
    document.getElementById('speed').innerText=`Speed : ${power.speed}`;
    document.getElementById('app').innerText=`Race : ${app.race}`;
    document.getElementById('world').innerText=`Published By : ${bio.publisher}`;
    
}
xhrreq.open('get',`https://www.superheroapi.com/api.php/2163050803820238/${id}`,true);
xhrreq.send();