//CRUD: CREATE, READ, UPDATE, DELETE

//VERIFICANDO QUAL ULTIMO ID 
let idMaior = 1;
function setupCurrentIdTodos(todos) {
    for (let i = 0; i < todos.length; i++) {
        if (todos[i].id > idMaior) {
            idMaior = todos[i].id;
        }
    }
}


//FUNÇÃO PARA ADICIONAR OS IDs
function addID(task) {
    idMaior++;
    task.id = idMaior;
}
//QUANDO FOI CRIADO
function addTimestamp(task) {
    task.createdAt = new Date();
    task.updatedAt = new Date();
}

//ADICIONAR NA LISTA
function addTodo(request, response, url, todos, categories) {
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
        } else {
            response.statusCode = 400;
            response.end("BAD REQUEST");
        }
    });
}

//FUNÇÃO QUE VERIFICA SE EXISTE O ID PESQUISADO
function findById(id, todos) {
    for (let i = 0; i < todos.length; i++) {
        if (todos[i] == id) {
            return todos[i];
        }
    }
    return false;
}
//LISTAR TODOS
function listTodos(request, response, url, todos, categories) {
    response.setHeader('Content-type', 'application/json');
    if (url.query.id) {
        let task = findById(url.query.id, todos);
        if (task && (!task.deletedAt || url.query.showDeleted == "true")) {
            response.end(JSON.stringify(task));
        } else {
            response.statusCode = 404;
            response.end("NOT FOUND");
        }

    } else {
        let newTodos = [];
        for (let i = 0; i < todos.length; i++) {
            if (!todos[i].deletedAt || url.query.showDeleted == "true") {
                newTodos.push(todos[i]);
            }
        }
        response.end(JSON.stringify(newTodos));
    }
}

//REMOVER TODO
function deleteTodo(request, response, url, todos, categories) {
    if (url.query.id) {
        for (let i = 0; i < todos.length; i++) {
            if (todos[i].id == url.query.id) {
                todos[i].deletedAt = new Date();
            }
        }
        response.end();
    } else {
        response.statusCode = 400;
        response.end("BAD REQUEST");
    }
}

//UPDATE TODO
function updateTodo(request, response, url, todos, categories) {
    if (url.query.id) {
        for (let i = 0; i < todos.length; i++) {
            if (todos[i].id == url.query.id && !todos[i].deletedAt) {
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
                        task.updatedAt = new Date();
                        todos[i] = task;
                        response.end();
                    } else {
                        response.statusCode = 400;
                        response.end("BAD REQUEST");
                    }
                });
                return;
            }
        }
        response.statusCode = 404;
        response.end("NOT FOUND");
    } else {
        response.statusCode = 400;
        response.end("BAD REQUEST");
    }
}

module.exports = {
    addTodo, listTodos, deleteTodo, updateTodo, setupCurrentIdTodos
}