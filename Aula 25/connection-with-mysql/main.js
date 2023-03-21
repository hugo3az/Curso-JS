const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "listra"
});

for(let i = 0; i < 100; i++){
    connection.query(`INSERT INTO todo (title, description) VALUES ('TODO - ${i}', 'OI ${i}')`);
}

connection.query('SELECT * FROM todo', (error, result, fields)=>{
    console.log(result);
});