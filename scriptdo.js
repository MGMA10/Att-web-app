var download = document.getElementById("download-btn");
var a = document.getElementById("hid");
var submit = document.getElementById("clr");
download.onclick =() =>{
  a.href=`/attendance/download`;
  a.click();

}
submit.onclick = () => {
  var data = {
    v:'1',
    cl: '1'
        };
console.log('nothing!');
fetch(window.location, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
  
})
.then(response => {
  if (response.status ===200)
  console.log(response.body);
  if (response.status ===500)
  console.log('nothing!');
  return response.text();
   
})
.then(text => {
  console.log(text);
  alert(text);

})

.catch(error => {
  console.error(' Error:', error);
             }); 
}

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, (err) => {console.log('Error in location')}, {
          enableHighAccuracy: true
      });
  } else {
      alert("Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;
  var accuracy = position.coords.accuracy;
  var accuracyInMeters = accuracy.toFixed(2) + " meters";

  var data = {
    v:'2',
    latd: latitude,
    lond: longitude,
    accd: accuracyInMeters
              };
  
  fetch(window.location.href, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => {
    if (response.status ===200)
    console.log(response.body);
    if (response.status ===500)
    console.log('nothing!');
    return response.text();
     
})
.then(text => {
    console.log(text);
    alert(text);

})
  .catch(error => {
    console.error(' Error:', error);
             });}


function num(){
  var data ={
  
    v:'3'
  }
  
  fetch(window.location, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => {
    if (response.status ===200)
    console.log(response.body);
    if (response.status ===500)
    console.log('nothing!');
    return response.text();
     
})
.then(text => {
    console.log(text);
    alert(text);

})
  .catch(error => {
    console.error(' Error:', error);
             });}
  
  
  
  
  function change_password(){
    var data ={
  
      v:'4',
      newpass:pass
    }
  
  }