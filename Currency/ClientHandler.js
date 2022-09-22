const link_url='https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/';
//declaring global array for each group 
const myArrGrp1Data=[];
const myArrGrp2Data=[];
const myArrGrp3Data=[];
//declaring global count for each group total
//jthis will be reset in onchange event
var grp1Total=0;
var grp2Total=0;
var grp3Total=0;

async function myGetCurrency() {

    const data =await  myCacheEnable();
    //this function main fetch data from api
    //const currency =document.getElementById("txtCurrency").value;
    //const response = await fetch(link_url+currency+".json");
   // const data = await response.json();
    //a callback handler of data receive
    myCallbackData(data);
   //console.log(data)
   
  }
function myCallbackData(DataReturn){
    //this function is the receiver of the request
    //converting json to array
    const myArray = Object.entries(DataReturn);
    //getting the second index of the array for validation
    const myArrData = Object.entries(myArray[1][1]);
    //for finding the array that has close range
    arrCloserRangeFilter(myArrData);
    //reset the total of each group first
    grp1Total=0;
    grp2Total=0;
    grp3Total=0;
    
   for(x=0;x<myArrData.length;x++){
    if(myArrData[x][1]<1){
        myArrGrp1Data.push(myArrData[x]);
        grp1Total++
    }
    if(myArrData[x][1]>=1 && myArrData[x][1]<1.5 ){
        myArrGrp2Data.push(myArrData[x]);
        grp2Total++
    }

    if(myArrData[x][1]>=1.5){
        myArrGrp3Data.push(myArrData[x]);
        grp3Total++
    }
    
   }
  
   myAppendGroupDetl();
}
function myAppendGroupDetl(){
    //reset the previous data first
    document.getElementById("grp3").innerHTML="";
    document.getElementById("grp2").innerHTML="";
    document.getElementById("grp1").innerHTML="";
  
    

    //instead of creating a bubble sort, i prefer sort method 
    
    myArrGrp1Data.sort(mySortArr);
    myArrGrp2Data.sort(mySortArr);
    myArrGrp3Data.sort(mySortArr);
    
    //this function will populate the the interface
    for(let x=0;x<grp1Total;x++){
        var paragraph = document.createElement("p");
        paragraph.innerHTML = myArrGrp1Data[x][0] +" = "+ myArrGrp1Data[x][1];
        document.getElementById("grp1").appendChild(paragraph);
    }

    for(let x=0;x<grp2Total;x++){
        var paragraph = document.createElement("p");
        paragraph.innerHTML = myArrGrp2Data[x][0] +" = "+ myArrGrp3Data[x][1];
        document.getElementById("grp2").appendChild(paragraph);
    }

    for(let x=0;x<grp3Total;x++){
        var paragraph = document.createElement("p");
        paragraph.innerHTML = myArrGrp3Data[x][0] +" = "+ myArrGrp3Data[x][1];
        document.getElementById("grp3").appendChild(paragraph);
    }
    

   
    //populating the total
    document.getElementById("grp1Total").innerHTML="Total:"+grp1Total;
    document.getElementById("grp2Total").innerHTML="Total:"+grp2Total;
    document.getElementById("grp3Total").innerHTML="Total:"+grp3Total;

   
}
function mySortArr(a,b){
return a[1]-b[1];
}

function arrCloserRangeFilter(arr){
   //this function will get the highest number of currencies that has difference of 0.5
 const tempArr=[];
 //purpose of first loop is to compare each array index to all other index
    for(x=0;x<arr.length;x++){
        let z=0;
//this second loop is the comparison of each index
        for(y=0;y<arr.length;y++){
            if(arr[y][1] > arr[x][1]-0.5 && arr[y][1] < arr[x][1]+0.5){
                z++;
            }
            
        }
        tempArr[x]=z;
    }
   
document.getElementById("MaxRange").innerHTML='<center><span> The length of the longest array:'+Math.max(...tempArr);+'</span></center>'
}

 function myCacheEnable(){
   
    cacheName="Currency";
    const currency =document.getElementById("txtCurrency").value;
     const fullUrl_link=link_url+currency+".json";
     return caches.open(cacheName).then((cache)=>{
       return caches.match(fullUrl_link)
       .then(cacheResponse=>{
        if(cacheResponse) return cacheResponse.json();
        else {
            return fetch(fullUrl_link).then((fetchResponse) => {
                if (!fetchResponse.ok) throw fetchResponse.statusText;
                cache.put(fullUrl_link, fetchResponse.clone())
                return  fetchResponse.json();
            })
        }
       })
       

    })
}

  
 




