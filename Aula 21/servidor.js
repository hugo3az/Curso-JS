const http = require("http");
const url = require("url");

let todos = [
    { id: 1, title: "fazer feira", description: "Laranjas, Arroz, Carne", categoryId: 1},
];

let categories = [
    {id: 1, name: "Finanças" },
];

//IMPORTANDO FUNÇÕES QUE ESTÃO NO ARQUIVO TODOS-ROUTER
const { listTodos, addTodo, deleteTodo,updateTodo,setupCurrentIdTodos } = require("./todos-router");
const { listCategories, addCategory, setupCurrentIdCategories } = require("./category-route");

setupCurrentIdTodos(todos);
setupCurrentIdCategories(categories);

//request: o servidor recebe (pergunta)
//response: o sevidor devolve (resposta)
function processRequest(request, response) {
    const reqUrl = url.parse(request.url, true);

    if (reqUrl.pathname == "/todo") {
        switch (request.method) {
            case "GET":
                listTodos(request, response, reqUrl, categories);
                break; 
            case "POST":
                addTodo(request, response, reqUrl, categories);
                break;
            case "PUT":
                updateTodo(request, response, reqUrl, categories);
                break;
            case "DELETE":
                deleteTodo(request, response, reqUrl, categories);
                break;
        }
    }else if(reqUrl.pathname == "/category"){
        switch (request.method) {
            case "GET":
                listCategories(request, response, reqUrl, categories);
                break; 
            case "POST":
                addCategory(request, response, reqUrl, categories);
                break;
        }
    }
}

const server = http.createServer(processRequest)
server.listen(3000);