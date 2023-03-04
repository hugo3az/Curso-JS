const http = require("http");
const url = require("url");

//IMPORTANDO FUNÇÕES QUE ESTÃO NO ARQUIVO TODOS-ROUTER
const listTodos = require("./todos-router").listTodos;
const addTodo = require("./todos-router").addTodo;
const deleteTodo = require("./todos-router").deleteTodo;
const updateTodo = require("./todos-router").updateTodo;

//Outro jeito de importar a função
//const {listTodos, addTodo, deleteTodo,updateTodo} = require("./todos-router");


//request: o servidor recebe (pergunta)
//response: o sevidor devolve (resposta)
function processRequest(request, response) {
    const reqUrl = url.parse(request.url, true);

    if (reqUrl.pathname == "/todo") {
        switch (request.method) {
            case "GET":
                listTodos(request, response, reqUrl);
                break; 
            case "POST":
                addTodo(request, response, reqUrl);
                break;
            case "PUT":
                updateTodo(request, response, reqUrl);
                break;
            case "DELETE":
                deleteTodo(request, response, reqUrl);
                break;
        }
    }
}

const server = http.createServer(processRequest)
server.listen(3000);