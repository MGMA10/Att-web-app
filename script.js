var id = document.getElementById("id");
id.onkeypress = function (event) {
    if (event.key === 'Enter') {
        event.preventDefault()
        getLocation();
    } 
}
function getLocation() {
    var a = id.value;
    if(a<9200000 || a>9299999)
    {
    alert("Enter your correct ID First , like 92***** ");}
    else
    {
                if (navigator.geolocation) {//chick navigator is on or off
                    navigator.geolocation.getCurrentPosition(showPosition, (err) => {console.log('Error in location')}, {
                        enableHighAccuracy: true
                    });
                } else {
                    alert("Geolocation is not supported by this browser.");
                }
            }}
    
            function showPosition(position) {
                var latitude = position.coords.latitude;
                var longitude = position.coords.longitude;          
                var data = {
                    id:  id.value,
                    lats: latitude,
                    lons: longitude
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
        return response.text()
         
    })
    .then(text => {
        console.log(text);
        alert(text)
    
    })
      .catch(error => {
        console.error(' Error:', error);
                 })
            }
       