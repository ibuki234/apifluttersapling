const express = require('express') 
const cors =require('cors')
const mysql =require('mysql2')
require('dotenv').config()
const app=express()


app.use(cors())

const connection = mysql.createConnection(process.env.DATABASE_URL)

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
})

app.listen(process.env.POR || 3000) 