const express = require("express");
const mysql = require("mysql2");

const app = express();

const connection = mysql.createConnection({
   host: 'localhost',
   user: 'root',
   password: 'root',
   database: 'names'
});

app.use((req, res)=>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    req.next();
});

app.get('/names',(req, res) => {
    connection.query("SELECT name FROM list", (error, data) => {
        if(error){
            console.log("ERRO NA HORA DO SELECT NO BANCO DE DADOS", error);
            res.send();
        }else{
            res.send(data.map((item) => {
                return item.name;
            }));
        }
    });
    
});

app.listen(3001, () =>{
    console.log("servidor ativado!");
});