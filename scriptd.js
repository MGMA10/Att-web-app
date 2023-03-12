
var password = document.getElementById("password");
var user = document.getElementById("User_name");
var submit = document.getElementById("submit");
var a = document.getElementById("hid");
var u= null ;

user.onkeypress = function (event) {
  if (event.key === 'Enter') {
      event.preventDefault()
     password.focus();
  } 
}

password.onkeypress = function (event) {
  if (event.key === 'Enter') {
      event.preventDefault()
     submit.click();
  } 
}

submit.onclick = () => {
console.log('Clicked')
  var data = {
    passwordin:  password.value,
    userin: user.value
              };

  fetch('/doc', {
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
    u=text;
    if (u == 1 ){
      alert('Wrong password or user name');
    }
    else{
      a.href=`${u}`;
      a.click();
    }

})
  .catch(error => {
    console.error(' Error:', error);
             }); 




}
 






