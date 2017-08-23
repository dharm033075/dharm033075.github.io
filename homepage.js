function validate_me(){
	alert("contacts are valiedating");
}
function validate_name(uname){
	if(uname.value.length==0){
		alert("name shouldn't be empty");
	}
}
function validate_mobile(umob){	
   if(umob.value.length!=10){
   	   alert("Please Enter 10 digit mobile number");
   }
}
function validate_email(uemail){
	var letter=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	if(uemail.value.match(letter)){
		uemail.focus();
	}else{
		alert("Please Enter the valid Email-id");
	}
}
function validate_gender(ugender){
	if(ugender.value=="Default"){
		alert("Please select male or female");
	}
}
function uploadpics(){
     var hreq= new XMLHttpRequest();
     var ourdata;
     hreq.open('GET','https://rawgit.com/dharm033075/dharm033075.github.io/master/gallerydata.json');
     hreq.onload=function(){
	 ourdata=JSON.parse(hreq.responseText);
	 loadimages(ourdata);
  }
    hreq.send();

    var galleryimage=document.getElementById("gallery");
    function loadimages(data1){
	var links=galleryimage.getElementsByTagName('a');
	for(var i=0;i<links.length;i++){
		links[i].firstChild.src=data1[Math.floor(Math.random()*4)].imageURL;		
	}
   }
}
function check(inputElement){
	if(inputElement.value==""){
		alert("Shouldn't be empty");
		return false;
	}else{
		return true;
	}
}
function dateCheck(inputElement){
	var timestamp=Date.parse(inputElement.value);
	var today = new Date();
        var dd = today.getDate();
     	var mm = today.getMonth()+1; //January is 0!
     	var yyyy = today.getFullYear();
 		if(dd<10){
        	dd='0'+dd
    	} 
    	if(mm<10){
        	mm='0'+mm
    	} 

		today = yyyy+'-'+mm+'-'+dd;	
		var tdyTimeStamp=Date.parse(today);	
	if(isNaN(timestamp) || timestamp>tdyTimeStamp){
		inputElement.value=today;
		inputElement.focus();
		
			return false;
	}{
			return true;
	}

}
function validURL(str) {
  var pattern = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/; // fragment locater
  if(pattern.test(str.value)) {
    return true;
  } else {
  	alert("Invalid URL");
    return false;    
  }
}


var obj=JSON.parse(data);
var countImage=1;
function addImageToJSON(){
	var imgurl=document.forms['imageContent']['imgurl'];
	var update=document.forms['imageContent']['update'];
	var imgName=document.forms['imageContent']['imageName'];
	var imgInfo=document.forms['imageContent']['imgInfo'];
	  	if(dateCheck(update) && check(imgName) && check(imgInfo)){
             obj.table.push(
		        {imgId:countImage,imageurl:imgurl.value,date:update.value,imagename:imgName.value,imgdes:imgInfo.value});
	            showImageInGallery(obj);
	            document.getElementById("popupForm").style.display='none';
	            document.getElementById('imageContent').reset();
	    }else{
		      alert("Can't add image,data not sufficient");
	}	
}
function showImageInGallery(imageData){
	var addingTo=document.getElementById("gallery");
	var divEle=document.createElement('div');
	divEle.Id=countImage;
	addingTo.appendChild(divEle);
	var bEle=document.createElement('button');
    bEle.Id=countImage;
	bEle.innerText='x';
	bEle.addEventListener('click',function(e){deleteImage(e.target.Id);});
	divEle.appendChild(bEle);
	var updateButton=document.createElement('button');
	updateButton.Id=countImage;
    updateButton.innerText="Edit";
    updateButton.addEventListener('click',function(e){showUpdateForm(e.target.Id);});
    //updateButton.addEventListener('click',function(e){updateImage(e.target.Id);});
    divEle.appendChild(updateButton);
    var newimg=document.createElement('img');
	var len=imageData.table.length;
	newimg.src=imageData.table[len-1].imageurl;
	newimg.Id=countImage;
	countImage++;
	newimg.addEventListener('click',function(e){showDetailsr(e.target.Id);});
	divEle.appendChild(newimg);
	
}

window.onload=function startingPicsFromJSON(){
	var addingTo=document.getElementById("gallery");
	for(var i=0;i<obj.table.length;i++){
		var divEle=document.createElement('div');
		divEle.Id=countImage;
		addingTo.appendChild(divEle);
		var bEle=document.createElement('button');
    	bEle.Id=countImage;
		bEle.innerText='x';
		bEle.addEventListener('click',function(e){deleteImage(e.target.Id);});
		divEle.appendChild(bEle);
		var updateButton=document.createElement('button');
		updateButton.Id=countImage;
    	updateButton.innerText="Edit";
    	updateButton.addEventListener('click',function(e){showUpdateForm(e.target.Id);});
//    	updateButton.addEventListener('click',function(e){updateImage(e.target.Id);});
    	divEle.appendChild(updateButton);
    	var newimg=document.createElement('img');
		newimg.src=obj.table[i].imageurl;
	    newimg.Id=countImage;
	    countImage++;
	    newimg.addEventListener('click',function(e){showDetailsr(e.target.Id);});
	    divEle.appendChild(newimg);
		
	}
}
function showDetailsr(imgId){
     var passage=document.getElementById('imageDesc');    
    for(var i=0;i<obj.table.length;i++){
    	if(obj.table[i].imgId==imgId){
    		 var imgslt=obj.table[i];
             passage.innerText="Image url: "+imgslt.imageurl+"\nImage name: "+imgslt.imagename+"\nUpdate Date: "+imgslt.date+"\nImage Info: "+imgslt.imgdes;	
    		 break;
    	}
    }
     document.getElementById('popupDetails').style.display="block";	
}
function deleteImage(imgId){
 	var x=document.getElementById('gallery');
 	var y=x.getElementsByTagName('div');
 	for(var i=0;i<obj.table.length;i++){
 		if(imgId==obj.table[i].imgId){
 			obj.table.splice(i,1);
 			x.removeChild(y[i]);
 			document.getElementById('popupDetails').style.display="none";	
 	        break;
 		}
 	}
 	
}
	function updateImage(){
		var imgIds=returnImgId();
		var imgurl=document.forms['imageContent']['imgurl'];
		var update=document.forms['imageContent']['update'];
		var imgName=document.forms['imageContent']['imageName'];
		var imgInfo=document.forms['imageContent']['imgInfo'];
		var x=document.getElementById('gallery');
		if(dateCheck(update) && check(imgName) && check(imgInfo)){
			for(var i=0;i<obj.table.length;i++){
 			  if(imgIds==obj.table[i].imgId){
 					obj.table[i].imageurl=imgurl.value;
 					obj.table[i].imagename=imgName.value;
 					obj.table[i].date=update.value;
 					obj.table[i].imgdes=imgInfo.value;
 					var y=x.getElementsByTagName('div')[i];
 					var z=y.getElementsByTagName('img');
 					z[0].src=obj.table[i].imageurl;
 					document.getElementById("popupForm").style.display='none';
 					document.getElementById('imageContent').reset();

 	        		break;
 				}
 			}
		}

	}
/*function addImageToJSON(){
	    var imgurl=document.getElementById("imageURL");
        var idate=document.getElementById('date');
        var iname=document.getElementById('imagename');
        var imginfo=document.getElementById('imageinformation');        
       	if(validURL(imgurl) && dateCheck(idate) && check(iname) && check(imginfo)){
       	    obj.table.push(
       	        {imageurl:imgurl.value,date:idate.value,imagename:iname.value,imgdes:imginfo.value});
       	    showImageIngallery(obj);
            
	    }else{
		      alert("Can't add image,data not sufficient");
	}
	console.log(obj);
	
}
function showImageIngallery(imageData){
	  var addingTo=document.getElementById("newImages");
	  var img=document.createElement("img");
	  var len=imageData.table.length;
	  img.src=imageData.table[len-1].imageurl;
	  addingTo.appendChild(img);
	  var opt=document.createElement('option');
	  opt.textContent=count;
	  var dropdwn=document.getElementById('dropDown');
	  dropdwn.appendChild(opt);
	  document.getElementById('info').reset();
	  count++;
}

function showDetails(){
	var dropdwn=document.getElementById('dropDown');
	var desPassage=document.getElementById('Passage');
	if(dropdwn.selectedIndex>0){
		var imgslt=obj.table[dropdwn.selectedIndex-1];
		desPassage.innerText="Image url: "+imgslt.imageurl+"\nImage name: "+imgslt.imagename+"\nUpdate Date: "+imgslt.date+"\nImage Info: "+imgslt.imgdes;
		}
}
function updateImage(){
	  var imageId=UpdateDetails();
	  var addedImages=document.getElementById("newImages");
	  var img=addedImages.getElementsByTagName("img");
	  img[imageId-1].src=obj.table[imageId-1].imageurl;
} 	

function UpdateDetails(){
	    var imageId=document.forms['info_update']['idNumber'];
	    if(imageId.value>obj.table.length){
	    	alert("Wrong choic of image");
	    	return null
	    }else{
	        var imageinfo=document.forms['info_update']['imageURL'];
           var idate=document.forms['info_update']['date'];
           var iname=document.forms['info_update']['imagename'];
           var imginfo=document.forms['info_update']['imageinformation']; 
           var updateDetails={imageurl:imageinfo.value,date:idate.value,imagename:iname.value,imgdes:imginfo.value};  
	        obj.table[imageId.value-1]=updateDetails;
	        return imageId.value;
	    }
	    return null;	    
	}

function removeImage(){
	var iurl=document.getElementById("newImages");
	var imageId=document.getElementById("idNumber2").value;
	var newImageArray=iurl.getElementsByTagName('img');
	if(imageId<=0 | imageId>newImageArray.length){
		alert("Can't procced ");
	}else{
		iurl.removeChild(newImageArray[imageId-1]);
		obj.table.splice(imageId-1,1);
		var x=document.getElementById('dropDown');
		x.removeChild(x.options[imageId]);
		document.getElementById('Passage').innerText=""

	}	
}
function save(){
   	var jsonString=JSON.stringify(obj);
    var file=new Blob([jsonString],{type:'text/json'});
    var fileURL=URL.createObjectURL(file);
    var link =document.getElementById("saving"); //galleryAdmin
    link.href=fileURL;
    link.download=document.getElementById('filename').value +'.json';
}
*/

