//fetching data
let request = new XMLHttpRequest();
request.open("GET","json/data.json", false);
request.send(null);
let jsonData = JSON.parse(request.responseText);
console.log(jsonData)

//variable needed for load more
let limited = 4

//initial load of elements
let cardList=document.getElementById("main-container")
for(var i=0; i<limited; i++){
    var date=jsonData[i].date.split(" ")
    var socialMedia = jsonData[i].source_type == "facebook" ? "facebook" : "instagram";
    cardList.innerHTML+=
    "<div class='card'>"+
        "<div class='top-card'>"+
            "<div class='profile'>"+
                "<div class='profile-img'>"+
                    "<img src='"+jsonData[i].profile_image+"' alt=''>"+
                "</div>"+
                "<div class='name-date'>"+
                    "<p>"+jsonData[i].name+"</p><p>"+date[0]+"</p>"+
                "</div>"+
            "</div>"+
            "<div class='icon'>"+
                "<img src='images/"+socialMedia+"-logo.svg' alt=''>"+
            "</div>"+
        "</div>"+
        "<div class='main-image' id='"+i+"' onclick='windowOpen(this)'>"+
            "<img src='"+jsonData[i].image+"' alt=''>"+
        "</div>"+
        "<div class='card-text'>"+
            "<p>"+jsonData[i].caption+"</p>"+
            "<div class='likes'>"+
                "<img src='images/heart.svg' id='"+i+"like' alt='' onclick='like(this)'>"+
                "<span>"+jsonData[i].likes+"</span>"+
            "</div>"+
        "</div>"+
    "</div>"
}

//load more functionality
function loadmore(){
    limited_next=limited+4
    for(var i=limited; i<limited_next; i++){
        var date=jsonData[i].date.split(" ")
        var socialMedia = jsonData[i].source_type == "facebook" ? "facebook" : "instagram";
        console.log(i)
        cardList.innerHTML+=
        "<div class='card'>"+
                "<div class='top-card'>"+
                    "<div class='profile'>"+
                        "<div class='profile-img'>"+
                            "<img src='"+jsonData[i].profile_image+"' alt=''>"+
                        "</div>"+
                        "<div class='name-date'>"+
                            "<p>"+jsonData[i].name+"</p><p>"+date[0]+"</p>"+
                        "</div>"+
                    "</div>"+
                    "<div class='icon'>"+
                        "<img src='images/"+socialMedia+"-logo.svg' alt=''>"+
                    "</div>"+
                "</div>"+
                "<div class='main-image' id='"+i+"' onclick='windowOpen(this)'>"+
                    "<img src='"+jsonData[i].image+"' alt=''>"+
                "</div>"+
                "<div class='card-text'>"+
                    "<p>"+jsonData[i].caption+"</p>"+
                    "<div class='likes'>"+
                        "<img src='images/heart.svg' id='"+i+"like' alt='' onclick='like(this)'>"+
                        "<span>"+jsonData[i].likes+"</span>"+
                    "</div>"+
                "</div>"+
        "</div>"

        if(jsonData[i+1]==undefined){
            document.getElementById("load").style.display="none";
            break;
        }
    }
    limited+=4
}

//open modal on click
function windowOpen(element){
    let id=element.id
    var likesId=element.id+"like"
    var likesImg=document.getElementById(likesId)
    var date=jsonData[id].date.split(" ")
    document.getElementById("clicked-card-container").innerHTML=
    "<div id='clicked-card'>"+
            "<div class='clicked-card-image'>"+
                "<img src='"+jsonData[id].image+"' alt=''>"+
            "</div>"+
            "<div class='clicked-card-text'>"+
                "<div class='clicked-card-profile'>"+
                    "<div class='clicked-card-profile-content'>"+
                        "<img src='"+jsonData[id].profile_image+"' alt=''>"+
                        "<div class='clicked-card-name-date'>"+
                            "<p>"+jsonData[id].name+"</p>"+
                            "<p>"+date[0]+"</p>"+
                        "</div>"+
                    "</div>"+
                    "<hr>"+
                    "<div class='clicked-card-description'>"+
                        "<p>"+jsonData[id].caption+"</p>"+
                        "<div class=clicked-card-likes'>"+
                            "<img src='/images/heart.svg' id='"+id+"like' alt='' alt='' onclick='like(this)'>"+
                            "<span>"+likesImg.parentElement.children[1].innerHTML+"</span>"+
                        "</div>"+
                    "</div>"+
                "</div>"+
            "</div>"+
    "</div>"

    document.querySelector("#clicked-card-container").style.display="flex";
    
}

//close modal on click outside
window.addEventListener('mouseup',function(event){
    var elem = document.getElementById('clicked-card-container');
    if(elem!=null){
        if(event.target == elem ){
            elem.style.display = 'none';
        }
    }
});  

//like functionality
function like(element){
    let originalLikesId=element.id.slice(0,-4)
    var all = document.querySelectorAll("[id='"+element.id+"']")
    if(document.getElementById(element.id).parentElement.children[1].innerHTML!==jsonData[originalLikesId].likes){
        let likes=parseInt(document.getElementById(element.id).parentElement.children[1].innerHTML)-1;
        for(var i=0;i<all.length;i++){
            all[i].parentElement.children[1].innerHTML=likes
            all[i].style.filter="none"
        }
    }else{
        let likes=parseInt(document.getElementById(element.id).parentElement.children[1].innerHTML)+1;
        for(var i=0;i<all.length;i++){
            all[i].parentElement.children[1].innerHTML=likes
            all[i].style.filter="invert(12%) sepia(86%) saturate(6815%) hue-rotate(1deg) brightness(120%) contrast(116%)"
        }
    }
}