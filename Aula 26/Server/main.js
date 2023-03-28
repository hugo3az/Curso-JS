const http = require("http");
const url = require("url");
const mysql = require('mysql2');
const fs = require("fs");
const path = require("path");

//conectando ao banco
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "listra"
});

connection.query("SELECT 1", (error, result) => {
  if (error) {
    console.log("Erro ao conectar com o banco de dados!", error);
  } else {
    console.log("Banco de dados conectado com sucesso!");
  }
});


const options = {
  encoding: "utf-8"
};

const { listTodos, addTodo, updateTodo, deleteTodo } = require("./routers/todos-router");
const { listCategories, addCategory, updateCategory, deleteCategory } = require("./routers/category-route");
const { listUser, addUser, updateUser, deleteUser, setupCurrentIdUser } = require("./routers/user-router");


fs.readFile(path.join("db", "user.json"), options, (error, data) => {
  if (!error) {
    user = JSON.parse(data);
    setupCurrentIdUser(user);
  } else {
    console.error(error);
  }
});

function processRequest(request, response) {

  const reqUrl = url.parse(request.url, true);
  if (reqUrl.pathname == "/todo") {
    switch (request.method) {
      case "GET":
        listTodos(request, response, reqUrl, connection);
        break;
      case "POST":
        //INSERT INTO
        addTodo(request, response, reqUrl, connection);
        break;
      case "PUT":
        //UPDATE INTO
        updateTodo(request, response, reqUrl, connection);
        break;
      case "DELETE":
        deleteTodo(request, response, reqUrl, connection);
        break;
    }
  } else if (reqUrl.pathname == "/category") {
    switch (request.method) {
      case "GET":
        listCategories(request, response, reqUrl, connection);
        break;
      case "POST":
        addCategory(request, response, reqUrl, connection);
        break;
      case "PUT":
        updateCategory(request, response, reqUrl, connection);
        break;
      case "DELETE":
        deleteCategory(request, response, reqUrl, connection);
        break;
    }
  }
}
const server = http.createServer(processRequest);
server.listen(3000);