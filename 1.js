var code = document.getElementById("id");
var a = document.getElementById("hid");
var submit= document.getElementById("submet");
id.onkeypress = function (event) {
    if (event.key === 'Enter') {
        event.preventDefault()
        a.href=`/users/${code.value}`;
        a.click();  } }
            submit.onclick =() =>{
                a.href=`/users/${code.value}`;
                a.click();}
              
             