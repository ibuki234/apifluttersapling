const express = require('express') 
const cors =require('cors');
const mysql =require('mysql2');
const multer=require('multer');
require('dotenv').config();
const app=express()


app.use(cors())



const storage=multer.diskStorage({
    destination:function(req,file,callback){
        callback(null,__dirname+"/uploads");
    },
    filename: function(req,file,callback){
        callback(null,file.originalname);
    

    }
})    

const uploads =multer({storage:storage});

app.post("/uploads",uploads.array("files"),(req,res)=>{
    // var image=req.params.uploads;
    console.log(req.body);
    res.json({status:"files recevied"});
    
})

const connection = mysql.createConnection(
process.env.DATABASE_URL
)

app.get('/',(req,res) => {
    console.log('Hi')
    res.send('Hello world')
})

app.get('/selectusergis',(req,res) =>{
    connection.query(
        'select * from user where pregis=0',
   
        function(err,results,fields){
            console.log(results )
            res.send(results)
        }
    )
}),

app.get('/selectmember',(req,res) =>{
    connection.query(
        'select * from user where pregis=1 and status=0',
   
        function(err,results,fields){
            console.log(results )
            res.send(results)
        }
    )
}),


    app.get('/selectuser',(req,res) =>{
    connection.query(
        'select * from user ',
    
        function(err,results,fields){
            console.log(results)
            //res.send(results)
            res.send('query_areas',{result:result});
            //    res.send({"msg":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"})
        }
    )
}),


    
    app.get('/selectvideo',(req,res) =>{
    connection.query(
        'select * from videostudy ',
    
        function(err,results,fields){
            console.log(results)
            // res.send(results)
              res.send(results)
            //    res.send({"msg":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"})
        }
    )
}),

    app.get('/insertuser/:email/:pass/:name/:tel/:imguser',(req,res) =>{
    var email=req.params.email;
     var pass=req.params.pass;
     var name=req.params.name;
     var tel=req.params.tel;
      var img=req.params.imguser;
    connection.query(
        'insert into user(email,password,name,tel,imguser) values(?,?,?,?,?)',
        [email,pass,name,tel,img],
        function(err,results,fields){
            console.log(results )
            res.send(results)
              console.log('insert success');
        }
    )
})



 app.get('/insertvideo/:name/:detail/:video',(req,res) =>{
    var name=req.params.name;
     var detail=req.params.detail;
     var video=req.params.video;

    connection.query(
        'insert into videostudy(namevideo,textexplain,video,report) values(?,?,?,?)',
        [name,detail,video,0],
        function(err,results,fields){
            console.log(results )
            res.send("insertvideocomplete")
              console.log('insert success');
        }
    )
})


app.get('/deleteuser/:id',(req,res) =>{
        var id=req.params.id;
    connection.query(
        'delete from user where id_user=?',[id],
        function(err,results,fields){
            console.log(results )
            res.send(results)
        }
    )
}),


    app.get('/checkpass/:id',(req,res) =>{
        var id=req.params.id;
    connection.query(
        'update user set pregis=1 where id_user=?',[id],
        function(err,results,fields){
            console.log(results )
            res.send(results)
        }
    )
}),


        app.get('/updateimg/:img',(req,res) =>{
        var img=req.params.img;
    connection.query(
        'update user set imguser=? where id_user=3',[img],
        function(err,results,fields){
            console.log(results )
            res.send(results)
        }
    )
}),

    app.get('/checklogin/:email/:pass',(req,res) =>{
          var email=req.params.email;
          var pass=req.params.pass;
          const a=4;
        const b=5;
    connection.query(
      'select id_user from user where email=? and password=? and pregis=1',[email,pass],
        // res.send("foundaccount"),
        function(err,results,fields){
           if(results.length<=0){
        res.send('false')

    }
               else if(email=="Admin69@gmail.com" && pass=="090165"){
                   res.send('admin')
               }
    else if(results.length>=1){
        // res.send(results)
        res.send('true')
    }
        else if(b==5){
            res.send(results);
        }
        }
    )
}),
app.listen(process.env.POR || 3000) 
