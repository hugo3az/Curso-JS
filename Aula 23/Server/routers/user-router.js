let currentId = 0;

function setupCurrentIdUser(user) {
    for (let i = 0; i < user.length; i++) {
        if (user[i].id > currentId)
            currentId = user[i].id;
    }
}

function addID(user) {
    currentId = currentId + 1;
    user.id = currentId;
}

function addTimestemp(user) {
    user.createdAt = +new Date();
    user.updatedAt = +new Date();
}

function addIsActive(user) {
    user.addIsActive = true;
    /* for (let i = 0; i < user.length; i++) {
        if (user[i].deletedAt)
        user[i].addIsActive = false;
    } */
}

function addUser(request, response, url, todos, categories, user, writeUSERtoFile) {
    response.statusCode = 201;
    let data = "";
    request.on('data', (chunk) => {
        data += chunk;
    });
    request.on("end", () => {
        let task = JSON.parse(data);
        if (task.username && task.password) {
            addIsActive(task);
            addID(task);
            //addTimestemp(task);       //não foi pedido para ser adicionado
            user.push(task);
            writeUSERtoFile();
            response.end();
        }
    });
}

function listUser(request, response, url, todos, categories, user) {
    response.setHeader('Content-type', 'application/json');
    if (url.query.id) {
        let task = findById(url.query.id, user);
        if (task && (!task.deletedAt || url.query.showDeleted == "true")) {
            response.end(JSON.stringify(task));
        } else {
            response.statusCode = 404;
            response.end("NOT FOUND");
        }
    } else if (url.query.categoryId) {
        let newCategory = [];
        for (let i = 0; i < user.length; i++) {
            if (!user[i].deletedAt || url.query.showDeleted == "true") {
                newCategory.push(user[i]);
            }
        }
        response.end(JSON.stringify(newTodos));

    } else {
        let newTodos = [];
        for (let i = 0; i < user.length; i++) {
            if (!user[i].deletedAt || url.query.showDeleted == "true") {
                newTodos.push(user[i]);
            }
        }
        response.end(JSON.stringify(newTodos));
    }
}

function deleteUser(request, response, url, todos, categories, user, writeUSERtoFile) {
    if (url.query.id) {
        for (let i = 0; i < user.length; i++) {
            if (user[i].id == url.query.id) {
                user[i].deletedAt = +new Date();
                writeUSERtoFile();
            }
        }
        response.end();
    } else {
        response.statusCode = 400;
        response.end("BAD REQUEST");
    }
}

function updateUser(request, response, url, todos, categories, user, writeUSERtoFile) {
    if (url.query.id) {
        for (let i = 0; i < user.length; i++) {
            if (user[i].id == url.query.id && !user[i].deletedAt) {
                let data = "";
                request.on('data', (chunk) => {
                    data += chunk;
                });
                request.on("end", () => {
                    let task = JSON.parse(data);
                    if (task.name) {
                        task.id = user[i].id;
                        task.createdAt = user[i].createdAt;
                        task.updatedAt = +new Date();
                        user[i] = task;
                        writeUSERtoFile();
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
    listUser, addUser, updateUser, deleteUser, setupCurrentIdUser
}