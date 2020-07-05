var url=window.location.href;
var heroesarray=url.split("#");//array of our total id

for(var i=2;i<heroesarray.length;i++) // first 2 elements are link and count so ignore
{
    let id=heroesarray[i]; //let to associate each image with its particular id
    var divElem=document.createElement('div');
    divElem.setAttribute('id',id);
    var xhr=new XMLHttpRequest();   //two xml request for pic and name

    xhr.onload=function(){
        var imageobj=JSON.parse(xhr.response);
        var url=imageobj.url;
        console.log(url);
        var imagelem=document.createElement('img');
        imagelem.setAttribute('src',url);
        imagelem.addEventListener('click',function(){//open then detailed info about hero wherre we hovered
            window.open(
                `index2.html#${id}`,
                  '_blank' 
            );
            
        });
        divElem.appendChild(imagelem);
    }
    xhr.open('get',`https://www.superheroapi.com/api.php/2163050803820238/${id}/image`,false);
    xhr.send();
    var xhrreq=new XMLHttpRequest();
    xhrreq.onload=function(){
        var heroinfo=JSON.parse(xhrreq.response);
        var heroname=heroinfo.name;
        var element=document.createElement('div');
        element.innerText=heroname;
        divElem.appendChild(element);
         
    }
    xhrreq.open('get',`https://www.superheroapi.com/api.php/2163050803820238/${id}`,false);
    xhrreq.send();
    
    var buttonleme=document.createElement('div');
    buttonleme.innerHTML=`<button class="btn btn-info my-2 my-sm-0" type="submit">Remove From My Team</button>`;//remove from list button and its handler
    divElem.appendChild(buttonleme);

    buttonleme.addEventListener('click',function(){
        document.getElementById(`${id}`).remove();
        var newurl=url.replace(`#${id}`,'');    //removing id from url so that element is permenantly deleted
        window.open(
            `${newurl}`,
            "_self",
        )  

    });
    document.getElementById('f-div').appendChild(divElem);
}