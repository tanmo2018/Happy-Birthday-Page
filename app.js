const express=require("express");
const bodyparser=require("body-parser");
const http=require("https");
const PORT = process.env.PORT || 3000;

const app=express();
app.use(express.static(__dirname+"/login"));
app.use(express.urlencoded({extended:true}));
app.get("/",function(req,res){
    res.sendFile(__dirname+"/login/login.html");
});

app.use(express.static(__dirname+"/index"));

app.post("/",function(req,res){
    const Year=req.body.year;
    const Food=req.body.food;
    const mail="abc"+Math.random()+"@gmail.com";
    const data={
       members:[
           {
               email_address:mail,
               status:"subscribed",
               merge_fields:{
                   YOB:Year,
                   FOOD:Food
               }
           }
       ]
    };
   
    const jsonData=JSON.stringify(data);
    const url="https://us11.api.mailchimp.com/3.0/lists/5cdd3c8df7";
    const options={
       method:"POST",
       auth:"tanmo:729b966930f7af1773ffb2c7fe2bef23-us11"
    }
    const request=http.request(url,options,function(response){
       response.on("data",function(data){
       console.log(JSON.parse(data));
       });
   });
    request.write(jsonData);
    request.end();

    res.sendFile(__dirname+"/index/index.html");

   });

   
app.listen(PORT,function(){
console.log("Server is connected on port 3000");
});
