var resObj;

function doClick() {
  var searchTerm = document.getElementById('search').value;
  var xhttp = new XMLHttpRequest();
  // When the request is successful, finished, and response is ready, execute these function
  xhttp.onreadystatechange = function() {
    
    if(this.readyState == 4 && this.status == 200){
      resObj = JSON.parse(xhttp.responseText);
      var ulElem = document.createElement("ul");   
          ulElem.id = "listofimg";  
          
            for(item of resObj.data){
               var liElem = document.createElement("li");
               var imgElem = document.createElement("img");
                imgElem.src = item.link;
                
                imgElem.style.width="150px";
                imgElem.style.height="100";
            if(imgElem.src.endsWith("jpg") || imgElem.src.endsWith("jpeg") || imgElem.src.endsWith("gif")){  
            ulElem.appendChild(liElem);
            liElem.appendChild(imgElem);
             }
           }
       
    document.body.appendChild(ulElem);
 
    }
  }
  xhttp.open("GET", "https://api.imgur.com/3/gallery/search/top/all/1?q="+searchTerm,true);
  xhttp.setRequestHeader("Authorization",
    "Client-ID 28ea5b31f9a6882")
  xhttp.send();
}


    
function Sortby(){
var key = document.getElementById("MySelect"); 
// if value equle like , date , viewer
    if(key.value == "followers"){
        RemoveElement();
        
        resObj.data.sort(sortbylike); 
        UpdatePictures();
    }else if(key.value == "datetime"){
        RemoveElement();
        
        resObj.data.sort(sortbydate); 
        UpdatePictures();
    }else if(key.value=="views"){
        RemoveElement();
        
        resObj.data.sort(sortbyview);
        UpdatePictures();
    }
}

function sortbylike(a , b){
      
    return  b.followers - a.followers ;
}
function sortbyview(a , b){     
        
    return  b.viewes - a.viewes ;
}
function sortbydate(a , b){
      
    return  a.datetime - b.datetime;
}


function SelectSort(){
    var span = document.createElement("span");
    var text = document.createTextNode("Sort by ");
    span.appendChild(text);
    // useing style 
    span.style.padding="4px";
    span.style.marginLeft="20px";
    // create element select
    var select = document.createElement("select");
    select.id = "MySelect";
    select.onchange=Sortby;
    select.style.padding="0px 50px 7px 50px";
    select.style.backgroundColor = "#89895d";
    select.style.borderRadius ="3px";
    select.style.color="white";
    
    var empty = document.createElement("option");
    var optlike = document.createElement("option");
    var optdate = document.createElement("option");
    var optviewers = document.createElement("option");
    // text node
    var nodelike = 
    document.createTextNode("followers");
    var nodedate =     
    document.createTextNode("datetime");
    var nodeview = 
    document.createTextNode("views");
    
    optlike.appendChild(nodelike);
    optdate.appendChild(nodedate);
    optviewers.appendChild(nodeview);
    
    select.appendChild(empty);
    select.appendChild(optlike);
    select.appendChild(optdate);
    select.appendChild(optviewers);
    document.body.appendChild(span);
    document.body.appendChild(select);
}

function RemoveElement()
{
 var ul = document.getElementById("listofimg");
      // remove element li   
        while (ul.hasChildNodes()){
          ul.removeChild(ul.firstChild);
        }    
    
}
function UpdatePictures(){
    var ul = document.getElementById("listofimg");
    // create new element li and image element
    for(var j=0 ; j<resObj.data.length;j++){
    var liElem = document.createElement("li");
    var imgElem = document.createElement("img");
    imgElem.src = resObj.data[j].link;
     
      imgElem.style.width="150px";
      imgElem.style.height="100";
       if(imgElem.src.endsWith("jpg") || imgElem.src.endsWith("jpeg") || imgElem.src.endsWith("gif")){  
           ul.appendChild(liElem);
           liElem.appendChild(imgElem);
         }
    }
    
    document.body.appendChild(ul);
}
// invoke function
SelectSort();
