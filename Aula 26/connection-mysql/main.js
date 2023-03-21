const mysql2 = require('mysql2');
const http = require('http');

const connection = mysql2.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "listra"
});

connection.query("SELECT 1", (error, result) => {
    if(error){
        console.log("Problema ao se conectar com o banco de dados", error);
    }else{
        console.log("banco de dados conectado com sucesso!");
    }
});


http.createServer((request,response) =>{

connection.query("SELECT * FROM todo", (error, result) => {
    if(error){
        response.statusCode = 500;
        response.end("ERROR");
    }
    else{
        response.statusCode = 200;
        response.setHeader('Content-Type', 'application/json');
        response.end(JSON.stringify(result));
    }
});

}).listen(3000);