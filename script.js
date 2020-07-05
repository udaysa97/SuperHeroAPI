var searchbox=document.getElementById('inputbox'); //inputBox
var searchbutton=document.getElementById('searchbutton'); //search Button
var imagedetails=document.getElementById('heroimage'); //Image of the current Hero
searchbox.addEventListener('keyup',getName);
searchbutton.addEventListener('click',displayHero);
imagedetails.addEventListener('click',detailedimagepage);
var id1; // id of the superhero api that we are currently using
var res=""; //url for favourite page
var count=0;    // total no of id in the res(url);
var arr=[]; // array to store our fav super hero
/*This function is used to give the frop downmenu when something is seaerched */
function getName(){
    
    var char =searchbox.value;
    var ul = document.getElementById("listofnames");

    if(char==="")
    {
        if(ul.hasChildNodes())
        {
        while(ul.firstChild) ul.removeChild(ul.firstChild);
        }
        return;
    }
    if(ul.hasChildNodes())
    {
    while(ul.firstChild) ul.removeChild(ul.firstChild);
    }
    var xhr=new XMLHttpRequest();
    xhr.onload=function(){
        var maybehero=JSON.parse(xhr.response);
        var result=maybehero.results;
        if(!result)
        {
            window.alert('Hero Not Found');
            searchbox.value="";
            return;
        }
        for(var i of result)
        {
            var ele=document.createElement('li');
            var name=i.name;
            ele.innerText=name;
            ele.addEventListener('click',function(){
                var content=this.innerText;
                if(ul.hasChildNodes())
                {
                while(ul.firstChild) ul.removeChild(ul.firstChild);
                }
                searchbox.value=content;
                return;
            });
            ele.classList.add('listyle')
           document.getElementById('listofnames').appendChild(ele);
        }

    }
   
    xhr.open('get',`https://www.superheroapi.com/api.php/2163050803820238/search/${char}`,true);
    xhr.send();
}
/*Used to get id of hero using its name */

function displayHero(e){
    e.preventDefault();
    var nameOfHero=searchbox.value;
    searchbox.value="";
    var xhrreq=new XMLHttpRequest();
    xhrreq.onload=function(){
        var heroobj=JSON.parse(xhrreq.response);
        var heroinfo=heroobj.results;
        var heroid=heroinfo['0'].id;
        var heroname=heroinfo['0'].name;
        var power=heroinfo[0].powerstats;
        var bio=heroinfo[0].biography;
       
        displayImage(heroid,heroname,power,bio);

    }
    xhrreq.open('get',`https://www.superheroapi.com/api.php/2163050803820238/search/${nameOfHero}`,true);
    xhrreq.send();
}
/*Used to display basics of the the char in main page */
function displayImage(id,name,power,bio)
{
    
    id1=id;
    var xhrRequest=new XMLHttpRequest();
    xhrRequest.onload=function(){
        var imageobject=JSON.parse(xhrRequest.response);
        var url=imageobject.url;
        document.getElementById('heading').innerText="Details :";
        document.getElementById('heroimage').setAttribute('src',url);
        document.getElementById('universe').innerText=`Published By: ${bio.publisher}`;
        document.getElementById('nameofhero').innerText=`Avatar Name: ${name}`;
        document.getElementById('favbutton').innerHTML=`<button class="btn btn-info my-2 my-sm-0" type="submit" id="favbut">Add To My Team</button>`
        document.getElementById('teambut').innerHTML=`<button class="btn btn-info my-2 my-sm-0" type="submit" id="gototeampage">Goto My Team</button>`

        var favbut=document.getElementById('favbut');
        favbut.addEventListener('click',createString);
        var goteam=document.getElementById('gototeampage');
        goteam.addEventListener('click',teampage);
    }
    xhrRequest.open('get', `https://www.superheroapi.com/api.php/2163050803820238/${id}/image`,true);
    xhrRequest.send();
}
/*Used to open new page for hero details */
function detailedimagepage(){
window.open(
    `index2.html#${id1}`,
      '_blank' 
);
}
/*used to create string url for our fav page */
function createString()
{
    var str=`#${id1}`;
    for(var k=0;k<arr.length;k++)
    {
        if(arr[k]===str)
        {
            var present=document.getElementById('danger-alert');
            present.classList.add('view');
            setTimeout(()=>{
                present.classList.remove('view');
            },1200);
            return;
        }
    }
    count++;
    arr.push(str);
    res=res.substring(1)+str;
    res=count+res;
    console.log(res);
    var success=document.getElementById('success-alert');
    success.classList.add('view');
    setTimeout(()=>{
        success.classList.remove('view');
    },1200);

}
/*Used to open fav page */
function teampage(){
    window.open(
        `index3.html#${res}`,
          '_blank'   
    );
}

