var user ='mohamed';
var password ='00000';
var lat;
var lon;
var acc;
var fs = require('fs');
var express = require('express');
var bodyParser = require('body-parser');
const excelJSON = require('excel2json_converter')

function generate0To25() {
    while (true) {
        let num = Math.floor(Math.random() * 100);
        if (num <= 25 && num >= 0) return num;
    }
}

function gen_arr() {
let arr =[]
for(var i=0;i<200;i++)
    arr.push(String.fromCharCode(generate0To25() + 65));
return arr.join('');}

function gen_url() {
    let arr =[]
    for(var i=0;i<5;i++)
        arr.push(String.fromCharCode(generate0To25() + 65));
    return arr.join('');}
fs.readFile('location.json','utf8',function(err,data){
    var data1 = JSON.parse(data);
    lat = data1.lat;
    lon = data1.lon;
    })

var k;
var l=null;



var loc = JSON.parse(fs.readFileSync('location.json', 'utf-8'));

var app = express()

app.use(express.json());
app.use(express.urlencoded())
app.use(express.static('public'))
app.use(logger)

function logger(req, res, next) {
    console.log(`${req.method} request is made on ${req.path}`);
    next()
}

app.get('/doc' , function (req, res) {
    fs.readFile('attendanced.html', 'utf8', function (err, file) {
        res.setHeader('Content-Type', 'text/html')
        res.send(file)
       
    })
})

app.post('/doc', (req, res) => {
    console.log(' log in '); 
    var {passwordin,userin} = req.body;
    if(userin ==user && passwordin == password)
    {
        k = gen_arr();
        res.send(`/${k}`);
    }
    else{
        res.send('1');
    }
         });



function addtofile(jsob){
    fs.readFile('text.json','utf8',function(err,data){
        var data1 = JSON.parse(data);
        let b;
        for (let val of data1) {
            if (val.id === jsob.id) b = true;
        }
        if(!b){
           data1.push(jsob);
           num = data1.length;
           var newdata = JSON.stringify(data1)
           fs.writeFile('text.json',newdata,function(err){
              if(err)
                 console.log('Data is saved')  
              else
                 console.log('Error in saving data')
        })}
    })
    }

    function clr(){
        l=gen_url();
        var txt =[];
        var tclr= JSON.stringify(txt);
        fs.writeFile('text.json',tclr,function(err){
        if(err)
            console.log('ERROR in clearing')  
        else
            console.log('NO Errors')
             })
    }
  
      app.get(`/attendance/download`, (req ,res) =>{
      console.log('download .................................................');
      var jsonData = JSON.parse(fs.readFileSync('text.json', 'utf-8'));
      convertedXLSX = excelJSON.jsonToXLSX(jsonData, 'attendace');
      fs.writeFile('attendance.xlsx', convertedXLSX, () => {
      console.log("Exel Written successful")
      res.download('attendance.xlsx');
    });
})
      
      app.post('/doc', (req, res) => {
      console.log(' log in '); 
      var {passwordin,userin} = req.body;
      if(userin ==user && passwordin == password)
      {
          k = gen_arr();
          res.send(`/${k}`);
      }
      else{
          res.send('1');
      }
         });

/////////////////////////////////////////////////////////////////////
      app.get(`/:k`, function (req, res) {
      if (req.params.k !== k) {
         res.status(404).send();
      return;
      }
      console.log(req.params.k)
      fs.readFile('downloadpage.html', 'utf8', function (err, file) {
      res.setHeader('Content-Type', 'text/html')
      res.send(file)
      })
})

app.post(`/:k`, (req, res) => {   
    var {v} =  req.body ;
    console.log(v)
    if(v == '1'){
       var {cl} =  req.body ;
    if(cl == '1'){
       clr();
    res.send('Data cleared successfully')}
}
else if (v == '2'){
    l = gen_url();
    console.log(l)
      var {latd,lond,accd} = req.body;
    fs.readFile('location.json','utf8',function(err,data){
    var data1 = JSON.parse(data);
     data1.lat = latd;
     data1.lon = lond;
     data1.acc = accd;
     lat =latd;
     lon =lond;
     acc =accd;
     console.log('hello');

     var newdata = JSON.stringify(data1)
     fs.writeFile('location.json',newdata,function(err){
    if(err)
        console.log('Error in saving data')  
    else
        console.log('data is saved')
    })
})
res.send('The location is set successfully'+'  lat is '+ latd +'  lon is ' +lond+ ' accuracy is '+ acc+ ' the url is :  '+ l )
}
else if (v == '3'){
    fs.readFile('text.json','utf8',function(err,data){
    var data1 = JSON.parse(data);       
    res.send(String(data1.length));
    })
}
}) 
console.log(l)
app.get(`/users/:l`, function (req, res) {
    console.log(req.params.l)

    if (req.params.l !== l) {
        res.status(404).send();
     return;
     }
    fs.readFile('attendance.html', 'utf8', function (err, file) {
        res.setHeader('Content-Type', 'text/html')
        res.send(file)
    })
})

   
    
app.post(`/users/:l`, (req , res) => { 
    var {id,lats,lons} = req.body;

    console.log(lats >= (lat-0.01));
    console.log( lats <= (lat+0.01));
    console.log(lons >= (lon-0.1));
    console.log(lons <= (lon+0.1));

    if((  lats >= (lat-0.0002)  &&  lats <= (lat+0.0002))  &&  (lons >= (lon-0.0002)  &&  lons <= (lon+0.0002)  ))    {
        console.log(101);
        var ip = req.headers['x-forwarded-for'];
        var time = Date.now();
        addtofile({"id":id,"ip":ip,"lon":lon,"lat":lat,"time":time});
        res.send('Data is saved successfully');}
    else{
        res.send('You are not at the location of the lecture or the doctor has not set the location yet');
     }
    }
     );

app.get(`/`, function (req, res) {

    fs.readFile('1.html', 'utf8', function (err, file) {
    res.setHeader('Content-Type', 'text/html')
    res.send(file)
    })
})

app.listen(process.env.PORT || 8080, function () {
    console.log('Listening At Localhost!!')
})
// app.listen(80, function () {
//     console.log('Listening At Localhost!!')
// })