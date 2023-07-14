const express = require('express') 
const cors =require('cors');
const mysql =require('mysql2');
require('dotenv').config();
const app=express()


app.use(cors())

const connection = mysql.createConnection(
process.env.DATABASE_URL
)

app.get('/',(req,res) => {
    console.log('Hi')
    res.send('Hello world')
})

app.get('/selectuser',(req,res) =>{
    connection.query(
        'select * from user',
        function(err,results,fields){
            console.log(results )
            res.send(results)
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
        'insert into user(email,pass,name,tel,imguser) values(?,?,?,?,?)',
        [email,pass,name,tel,img],
        function(err,results,fields){
            console.log(results )
            res.send(results)
              console.log('insert success');
        }
    )
})

app.listen(process.env.POR || 3000) 