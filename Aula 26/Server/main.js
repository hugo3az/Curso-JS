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
  if(error){
    console.log("Erro ao conectar com o banco de dados!", error);
  }else{
    console.log("Banco de dados conectado com sucesso!");
  }
});


const options = {
  encoding: "utf-8"
};

const { listTodos, addTodo, updateTodo, deleteTodo, setupCurrentIdTodos } = require("./routers/todos-router");
const { listCategories, addCategory, updateCategory, deleteCategory, setupCurrentIdCategories } = require("./routers/category-route");
const { listUser, addUser, updateUser, deleteUser, setupCurrentIdUser } = require("./routers/user-router");


let todos = [];
let categories = [];
let user = [];

fs.readFile(path.join("db", "user.json"), options, (error, data) => {
  if (!error) {
    user = JSON.parse(data);
    setupCurrentIdUser(user);
  } else {
    console.error(error);
  }
})

fs.readFile(path.join("db", "category.json"), options, (error, data) => {
  if (!error) {
    categories = JSON.parse(data);
    setupCurrentIdCategories(categories);
  } else {
    console.error(error);
  }
})

fs.readFile(path.join("db", "todo.json"), options, (error, data) => {
  if (!error) {
    todos = JSON.parse(data);
    setupCurrentIdTodos(todos);
  } else {
    console.error(error);
  }
})

const writeUSERtoFile = () => {
  fs.writeFile(path.join("db", "user.json"), JSON.stringify(user), (err) => {
    if (err) {
      console.error(err);
    }
  });
}

const writeTODOtoFile = () => {
  fs.writeFile(path.join("db", "todo.json"), JSON.stringify(todos), (err) => {
    if (err) {
      console.error(err);
    }
  });
}

const writeCATEGORYtoFile = () => {
  fs.writeFile(path.join("db", "category.json"), JSON.stringify(categories), (err) => {
    if (err) {
      console.error(err);
    }
  });
}

function processRequest(request, response) {

  const reqUrl = url.parse(request.url, true);
  if (reqUrl.pathname == "/todo") {
    switch (request.method) {
      case "GET":
        listTodos(request, response, reqUrl, connection);
        break;
      case "POST":
        addTodo(request, response, reqUrl, todos, categories, user, writeTODOtoFile);
        break;
      case "PUT":
        updateTodo(request, response, reqUrl, todos, categories, user, writeTODOtoFile);
        break;
      case "DELETE":
        deleteTodo(request, response, reqUrl, todos, categories, user, writeTODOtoFile);
        break;
    }
  } else if (reqUrl.pathname == "/category") {
    switch (request.method) {
      case "GET":
        listCategories(request, response, reqUrl, todos, categories, user, writeCATEGORYtoFile);
        break;
      case "POST":
        addCategory(request, response, reqUrl, todos, categories, user, writeCATEGORYtoFile);
        break;
      case "PUT":
        updateCategory(request, response, reqUrl, todos, categories, user, writeCATEGORYtoFile);
        break;
      case "DELETE":
        deleteCategory(request, response, reqUrl, todos, categories, user, writeCATEGORYtoFile);
        break;
    }
  } else if (reqUrl.pathname == "/user") {
    switch (request.method) {
      case "GET":
        listUser(request, response, reqUrl, todos, categories, user, writeUSERtoFile);
        break;
      case "POST":
        addUser(request, response, reqUrl, todos, categories, user, writeUSERtoFile);
        break;
      case "PUT":
        updateUser(request, response, reqUrl, todos, categories, user, writeUSERtoFile);
        break;
      case "DELETE":
        deleteUser(request, response, reqUrl, todos, categories, user, writeUSERtoFile);
        break;
    }
  }
}
const server = http.createServer(processRequest);
server.listen(3000);