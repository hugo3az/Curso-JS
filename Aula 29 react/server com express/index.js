
const express = require('express');
const mysql = require('mysql2');
const app = express();
app.use(express.json());
const port = 3000;

//FUTURO: arquivos de ambiente development.env, producttion.env
const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'listra'
});

//TODO
app.get('/todo', (request, response) => {
    let query = "SELECT * FROM todo";
    if (request.query.showDeleted != "1") {
        query += ' WHERE deleted_at IS NULL';
    }
    connection.query(query, (error, result) => {
        if (error) {
            response.status(404).send();
        } else {
            response.send(result);
        }
    });
});

app.get('/todo/:id', (request, response) => {
    let query = `SELECT * FROM todo WHERE id=${request.params.id}`;
    if (request.query.showDeleted != "1") {
        query += ' AND deleted_at IS NULL';
    }
    connection.query(query, (error, result) => {
        if (error) {
            response.status(404).send();
        } else {
            response.send(result);
        }
    });
});


app.delete('/todo/:id', (request, response) => {
    let query = `UPDATE todo SET deleted_at=NOW() WHERE id=${request.params.id}`;
    console.log(query);
    connection.query(query, (error, result) => {
        if (error) {
            response.status(404).send;
            console.log(error);
        } else {
            response.send("DELETED");
        }
    });
});

app.put('/todo/:id', (request, response) => {
    const title = request.body.title;
    const description = request.body.description;
    const categoryId = request.body.categoryId;
    if (title && description && categoryId) {
        //ATUALIZAR NO BANCO
        connection.query(`UPDATE todo SET title='${title}', description='${description}', category_id='${categoryId}', updated_at=NOW() WHERE id='${request.params.id}'`
            , (error, result) => {
                if (error) {
                    response.status = 500;
                    response.send("SERVER ERROR");
                } else {
                    response.status = 201;
                    response.send("UPDATED");
                }
            });
    } else {
        response.status = 400;
        response.end("BAD REQUEST");
    }
});


app.post('/todo', (request, response) => {
    const title = request.body.title;
    const description = request.body.description;
    const categoryId = request.body.categoryId;
    let query = `INSERT INTO todo (title, description, category_id)`;
    if (title && description && categoryId) {
        query += ` VALUES ('${title}', '${description}', '${categoryId}')`;
        console.log(query);
        connection.query(query, (error, result) => {
            if (error) {
                response.status(404).send;
                console.log(error);
            } else {
                response.send("ADDED");
            }
        });
    } else {
        response.status = 400;
        response.send("BAD REQUEST");
    }
});


//definindo porta do servidor
app.listen(port, () => {
    console.log("servidor ativo!");
});