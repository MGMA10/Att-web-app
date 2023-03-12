var fs = require('fs');
function clr(){
    var txt ={"id":[],"ip":[],"lat":[],"lon":[],"time":[],"num":0};
    var tclr= JSON.stringify(txt);
    fs.writeFile('text.json',tclr,function(err){
        if(err)
        console.log(' ERROR ')  
        else
        console.log('Data is deleted')
         })



}

clr();
//