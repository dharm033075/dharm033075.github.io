var tables=[new Array(),new Array(),new Array(),new Array(),new Array(),new Array(),new Array(),new Array(),new Array(),new Array(),new Array(),new Array()];
var items=[{"itemName":"French Fries","itemPrice":75},{"itemName":"Dosa","itemPrice":15},{"itemName":"Butter Roti","itemPrice":18},
{"itemName":"Paneer Butter Masala","itemPrice":50},{"itemName":"Hyderabadi Biryani","itemPrice":225},{"itemName":"Mutton Biryani","itemPrice":250},
{"itemName":"Veg Biryani","itemPrice":135},{"itemName":"Beer","itemPrice":95},{"itemName":"Sprite","itemPrice":35},{"itemName":"Dosa","itemPrice":15},{"itemName":"Butter Roti","itemPrice":18}];

window.onload=function(){
	addNewTable();
	addNewItem();
}
function addNewTable(){
	var newTable=document.getElementById("tablePanel");
	for(var i=0;i<tables.length;i++){		
		var mainPanel=document.createElement('div');
		mainPanel.className="eachTable";			
		mainPanel.addEventListener('click',function(event){			
			showOrderDetails(event.target.parentElement.childNodes[0].id);
			var tabNumTables=event.target.parentElement.childNodes[0].id.split('-')[1];
			if(tables[tabNumTables-1].length>0){event.target.parentElement.style.backgroundColor='orange';}});
		var panelHeading=document.createElement('div');
		panelHeading.className='panel-heading';
		panelHeading.id='table'+'-'+(+i+1);
		panelHeading.innerText='Table'+'-'+(+i+1);
		mainPanel.appendChild(panelHeading);
		var panelBody=document.createElement('div');
		panelBody.className="panel-body";
		panelBody.id='table'+'-'+(+i+1);
		panelBody.innerText='Rs. 0.0 | Total Items 0';
		mainPanel.appendChild(panelBody);
		newTable.appendChild(mainPanel);	
			}
	
}
function addNewItem(){
	var itemPanel=document.getElementById('itemPanel');
	for(var i=0;i<items.length;i++){
		var mainPanel=document.createElement('div');
		mainPanel.className="panel panel-default custom";
		mainPanel.addEventListener('dragstart',function(event){startDrag(event);});
		mainPanel.id="FoodItem"+"-"+(+i+1);
		mainPanel.draggable="true";
		var panelHeading=document.createElement('div');
		panelHeading.className="panel-heading";
		panelHeading.innerText=items[i].itemName;
		mainPanel.appendChild(panelHeading);
		var panelBody=document.createElement('div')
		panelBody.className="panel-body";
		panelBody.innerText=items[i].itemPrice;
		mainPanel.appendChild(panelBody);
		itemPanel.appendChild(mainPanel);
	}
	
}
function addFoodInItemList(){
	var x=document.getElementById('foodName');
	var y=document.getElementById('foodPrice');
	if(x.value!="" && y.value!=""){
		items.push({"itemName":x.value,"itemPrice":y.value});
		addNewItem();
		x.value="";
		y.value="";
	}
	document.getElementById('addItemPopup').style.display='none';
	
}
function searchTab(){
	var panel=document.getElementById('tablePanel');
	var table=document.getElementById('searchTable').value.toUpperCase();
	var tables=panel.getElementsByClassName('panel-heading');
	for(var i=0;i<tables.length;i++){
		if(tables[i].innerText.toUpperCase().indexOf(table)>-1){
			tables[i].parentElement.style.display="";
		}else{
			tables[i].parentElement.style.display="none";
		}
	}
}
function searchItem(){
	var panel=document.getElementById('itemPanel');
	var item=document.getElementById('searchItems').value.toUpperCase();
	var items=panel.getElementsByClassName('panel-heading');
	for(var i=0;i<items.length;i++){
		if(items[i].innerText.toUpperCase().indexOf(item)>-1){
			items[i].parentElement.style.display="";
		}else{
			items[i].parentElement.style.display="none";
		}
	}

}
var img = new Image(); 
    img.src = '';//'http://www.pngall.com/wp-content/uploads/2016/03/Food-Free-PNG-Image.png'; 
function startDrag(event){
	var dti = event.dataTransfer.items;
  	if (dti === undefined || dti == null) {
    console.log("Browser does not support DataTransferItem interface");
    return;
   }

   	var itemName=event.target.getElementsByTagName('div')[0].innerText;
   	var itemPrice=event.target.getElementsByTagName('div')[1].innerText;
	event.dataTransfer.setData('text/plain',event.target.id);
	
	event.dataTransfer.setDragImage(img,10,10);
	event.dataTransfer.effectAllowed="copy";
	event.dataTransfer.dropEffect="copy";
}

function contains(list,value){
	for(var i=0;i<list.length;i++){
		if(list[i]===value)return true;
	}
	return false;
}

function dragoverHandler(event){
	 var dti = event.dataTransfer.items;
	 if (dti === undefined || dti == null) {
    console.log("Browser does not support DataTransferItem interface");
    return;
  	}
	var isType=contains(event.dataTransfer.types,"text/plain");
	if(isType){
		event.preventDefault();
		event.dataTransfer.dropEffect="copy";
		
	}
}

function dropHandler(event){
	var dti = event.dataTransfer.items;
    if (dti === undefined || dti == null) {
    console.log("Browser does not support DataTransferItem interface");
    return;
  	}
	event.stopPropagation();
	event.preventDefault();
	var data=event.dataTransfer.getData("text/plain");
	
	var sourceId=data.split("-")[1];
	var itemName=items[sourceId-1].itemName;
	var price=items[sourceId-1].itemPrice;
	var targetId=event.target.id.split("-")[1];
	var tableNum=tables[targetId-1];
	if(tableNum.length==0){
		tableNum.push({"itemName":itemName,"price":price,"itemCount":1});
		}else{
			for(var i=0;i<tableNum.length;i++){
				if(tableNum[i].itemName==itemName){			
				break;
			}
	 	}

	 	if(i<tableNum.length){
	 		tableNum[i].itemCount++;
	 		
	 	}else{
	 			tableNum.push({"itemName":itemName,"price":price,"itemCount":1});
	 			
	 	}
	}
	showTotalPrice(event.target.id);
}

function showTotalPrice(tableId){
	var tableEle=document.getElementById(tableId);
	tableEle.parentElement.getElementsByTagName('div')[1].innerText='Rs. '+sum(tableId)+' | '+'Total Items: '+totalItems(tableId);
}

function totalItems(tableId){
	var items=0;
	var tId=tableId.split("-")[1];
	var tableItself=tables[tId-1];
	for(var i=0;i<tableItself.length;i++){
		items=items+tableItself[i].itemCount;
	}
	return items;
}

function sum(tableId){
	var totalSum=0.0;
	var tId=tableId.split("-")[1];
	var tableNum=tables[tId-1];
	if(tableNum.length==0){
		return 0.0;
	}else{
	 		for(var i=0;i<tableNum.length;i++){
				totalSum=totalSum+ (+tableNum[i].price*tableNum[i].itemCount);
			}
			return totalSum;
	}
}
function addItemsInPopupTable(selectedTab){	
	var popupTable=document.getElementById("popupTable");
	for(var i=0;i<selectedTab.length;i++){
		var trow=document.createElement('tr');
		trow.className="orderedItem";
		var tSNo=document.createElement('td');
		tSNo.innerText='\u2666';
		var tItem=document.createElement('td');
		tItem.innerText=selectedTab[i].itemName;
		var tPrice=document.createElement('td');
		tPrice.innerText=selectedTab[i].price;
		var tNumber=document.createElement('td');
		var tInput=document.createElement('input');
		tInput.value=selectedTab[i].itemCount;
		tInput.type="Number";
		tInput.addEventListener('change',function(event){itemNumberChange(event);});
		tNumber.appendChild(tInput);
		var tDelete=document.createElement('td');
		tDelete.innerText='\327';
		tDelete.addEventListener('click',function(event){ removeAnItem(event);});//
		trow.appendChild(tSNo);
		trow.appendChild(tItem);
		trow.appendChild(tPrice);
		trow.appendChild(tNumber);
		trow.appendChild(tDelete);
		popupTable.appendChild(trow);
	}
}
function addItemsInBillTable(selectedTab){	
	var billCont=document.getElementById("billContent");
	for(var i=0;i<selectedTab.length;i++){
		var trow=document.createElement('tr');
		trow.className="billItem";
		var tSNo=document.createElement('td');
		tSNo.innerText='\272';
		var tItem=document.createElement('td');
		tItem.innerText=selectedTab[i].itemName;
		var tPrice=document.createElement('td');
		tPrice.innerText=selectedTab[i].price;
		var tNumber=document.createElement('td');
		tNumber.innerText=selectedTab[i].itemCount;
		trow.appendChild(tSNo);
		trow.appendChild(tItem);
		trow.appendChild(tPrice);
		trow.appendChild(tNumber);
		billCont.appendChild(trow);
	}
}
function itemNumberChange(event){
	console.log(event.target.value);
	var itemsNum=event.target.value;	
	itemsNum=parseInt(itemsNum);
	if(itemsNum<=0){
		itemsNum=0;
	}
	var headStr=document.getElementById('headingOfTable').innerText;
	var tableNum=headStr.split('|')[0].split('-')[1];
	var itemInTable=event.target.parentElement.parentElement.rowIndex-2;
	var itemsTab=tables[tableNum-1];
	itemsTab[itemInTable].itemCount=itemsNum;
	showTotalPrice(headStr.split('|')[0].toLowerCase().trim());
	totalPriceEle=document.getElementById('totalItemsPrice');
	totalPriceEle.innerText='Total Price: '+sum(headStr.split('|')[0].toLowerCase().trim());
}
function removeAnItem(event){
	var x=event.target.parentElement;
	var headStr=document.getElementById('headingOfTable').innerText;
	var tableNum=headStr.split('|')[0].split('-')[1];
	tables[tableNum-1].splice(event.target.parentElement.rowIndex-2,1);	
	document.getElementById("popupTable").removeChild(x);
	showTotalPrice(headStr.split('|')[0].toLowerCase().trim());
	totalPriceEle=document.getElementById('totalItemsPrice');
	totalPriceEle.innerText='Total Price: '+sum(headStr.split('|')[0].toLowerCase().trim());
	
}

var prevClickTableName="";
var lastClickTableItems=0;
function showOrderDetails(tableItself){
	var tableInTables=tableItself.split("-")[1];
	var selectedTab=tables[tableInTables-1];
	if(selectedTab.length==0){
			document.getElementById('popupDiv').style.display='none';
			document.getElementById('popupTable').style.display='none';
			console.log("nothing to print");			
			prevClickTableName=tableItself;
			lastClickTableItems=0;	
	}else{
			prevClickTableName=tableItself;
			lastClickTableItems=totalItems(tableItself);
			var popupHeading=document.getElementById("headingOfTable");
			popupHeading.innerText=tableItself.toUpperCase()+" | Order Details";			
			var popupTable=document.getElementById('popupTable');
			document.getElementById('popupDiv').style.display='block';
			popupTable.style.display="block";
			removeChildFromPopupTable(popupTable);
			addItemsInPopupTable(selectedTab);
			var lastRowEle=document.createElement('tr');
			lastRowEle.id="lastRow";
			var totalPriceEle=document.createElement('td');
			totalPriceEle.id="totalItemsPrice";
			totalPriceEle.colSpan=3;
			totalPriceEle.innerText='Total Price: '+sum(tableItself);
			lastRowEle.appendChild(totalPriceEle);
			var empty=document.createElement('td');
			empty.width=20;
			lastRowEle.appendChild(empty);
			var closeEle=document.createElement('button');
			closeEle.id="closeElement";
			closeEle.innerText="Close(Generate Bill)";
			closeEle.addEventListener('click',function(event){generateBill(event);});
			lastRowEle.appendChild(closeEle);
			popupTable.appendChild(lastRowEle);
	}
}
function removeChildFromPopupTable(upTable){
	//debugger;
		var itemsInTable=upTable.getElementsByClassName('orderedItem');
		for(var i=itemsInTable.length-1;i>=0;i--){
			upTable.removeChild(itemsInTable[i]);
		}
		var closeEle=document.getElementById("lastRow");
		if(closeEle!=null){
			upTable.removeChild(closeEle);
		}
		

}
function generateBill(event){
	document.getElementById('popupDiv').style.display='none';
	var tableItself=document.getElementById('headingOfTable').innerText.toLowerCase().split('|')[0].trim();
	var tableInTables=tableItself.split('-')[1];
	var selectedTab=tables[tableInTables-1];
	var z=document.getElementById('billPopup');
	var billCont=document.getElementById('billContent');
	
	if(selectedTab.length==0){			
			console.log("nothing to Pay");
			document.getElementById(tableItself).parentElement.style.backgroundColor="";	
	}else{	
			z.style.display='block';
			var billHeading=document.getElementById("headingOfBill");
			billHeading.innerText=tableItself.toUpperCase()+" | Order Bill";		
			removeChildFromBillTable(billCont);
			addItemsInBillTable(selectedTab);
			var lastBillRow=document.createElement('tr');
			lastBillRow.className="billItem";
			lastBillRow.id="billLastRow";
			lastBillRow.innerText='Total Payble Amount \u20B9: '+sum(tableItself)+'/-';
			billCont.appendChild(lastBillRow);
	}

}
function removeChildFromBillTable(billTable){
		var itemsInBill=billTable.getElementsByClassName('billItem');
		for(var i=itemsInBill.length-1;i>=0;i--){
			billTable.removeChild(itemsInBill[i]);
		}		
}
function tableColor(){
	var z=document.getElementById('headingOfTable').innerText.toLowerCase().split('|')[0].trim();
	document.getElementById(z).parentElement.style.backgroundColor="";
	document.getElementById('popupDiv').style.display='none';
}
function tableColor2(){
	var z=document.getElementById('headingOfBill').innerText.toLowerCase().split('|')[0].trim();
	document.getElementById(z).parentElement.style.backgroundColor="";
	document.getElementById('billPopup').style.display='none';
	window.location.reload();
}