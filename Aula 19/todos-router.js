//CRUD: CREATE, READ, UPDATE, DELETE

let todos = [
    { id: 23, title: "fazer feira", description: "Laranjas, Arroz, Carne" },
];

//VERIFICANDO QUAL ULTIMO ID 

/* DESAFIO: DESCOBRIR UMA FORMA DE SEMPRE GUARDAR O MAIOR ID DA LISTA DENTRO DA VARIAVEL CURRENTID -OK */
let idMaior = 1;
for (let i = 0; i < todos.length; i++) {
    if (todos[i].id > idMaior) {
        idMaior = todos[i].id;
    }
}
//currentID = todos[todos.length - 1].id;

//FUNÇÃO PARA ADICIONAR OS IDs
function addID(task) {
    idMaior++;
    task.id = idMaior;
}
//QUANDO FOI CRIADO
function addTimestamp(task) {
    task.createdAt = new Date();
}

//ADICIONAR NA LISTA
function addTodo(request, response) {
    response.statusCode = 201;

    let data = "";
    request.on('data', (chunk) => {
        data += chunk;
    });
    request.on("end", () => {
        let task = JSON.parse(data);
        //verificar se veio na request o ´title´ e a ´description´ se não vinher retornar (response)com 400 (BAD REQUEST)
        if (task.title && task.description) {
            addID(task);
            addTimestamp(task);
            todos.push(task);
            response.end();
        }else{
            response.statusCode = 400;
            response.end("BAD REQUEST");
        }
    });
}

//LISTAR TODOS
function listTodos(request, response) {
    response.setHeader('Content-type', 'application/json');
    response.end(JSON.stringify(todos));
}

//REMOVER TODO
function deleteTodo(request, response, url) {
    if (url.query.id) {
        let newTODOS = [];
        for (let i = 0; i < todos.length; i++) {
            if (todos[i].id != url.query.id) {
                newTODOS.push(todos[i]);
            }
        }
        todos = newTODOS;
        response.end();
    } else {
        response.statusCode = 400;
        response.end("BAD REQUEST");
    }
}

//UPDATE TODO
function updateTodo(request, response, url) {
    if (url.query.id) {
        for (let i = 0; i < todos.length; i++) {
            if (todos[i].id == url.query.id) {
                let data = "";
                request.on('data', (chunk) => {
                    data += chunk;
                });
                request.on("end", () => {
                    let task = JSON.parse(data);
                    //verificar se veio na request o ´title´ e a ´description´ se não vinher retornar (response)com 400 (BAD REQUEST)
                    if (task.title && task.description) {
                        task.id = todos[i].id;
                        task.createdAt = todos[i].createdAt;
                        todos[i] = task;
                        response.end();
                    }else{
                        response.statusCode = 400;
                        response.end("BAD REQUEST");
                    }
                });
            }
        }
    } else {
        response.statusCode = 400;
        response.end("BAD REQUEST");
    }
}

module.exports = {
    addTodo, listTodos, deleteTodo, updateTodo
}