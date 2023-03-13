//CRUD: CREATE, READ, UPDATE, DELETE

//VERIFICANDO QUAL ULTIMO ID 
let idMaior = 1;
function setupCurrentIdCategories(categories) {
    for (let i = 0; i < categories.length; i++) {
        if (categories[i].id > idMaior) {
            idMaior = categories[i].id;
        }
    }
}

//FUNÇÃO PARA ADICIONAR OS IDs
function addID(category) {
    idMaior++;
    category.id = idMaior;
}
//QUANDO FOI CRIADO
function addTimestamp(category) {
    category.createdAt = new Date();
    category.updatedAt = new Date();
}

//ADICIONAR CATEGORIAS NA LISTA
function addCategory(request, response, url, todos, categories) {
    response.statusCode = 201;

    let data = "";
    request.on('data', (chunk) => {
        data += chunk;
    });
    request.on("end", () => {
        let category = JSON.parse(data);
        //verificar se veio na request o ´NAME´ da categoria se não (BAAD REQUEST)
        if (category.name) {
            addID(category);
            addTimestamp(category);
            categories.push(category);
            response.end();
        } else {
            response.statusCode = 400;
            response.end("BAD REQUEST");
        }
    });
}

//LISTAR TODOS
function listCategories(request, response, url, todos, categories) {
    response.setHeader('Content-type', 'application/json');
    if (url.query.id) {
        let category = findById(url.query.id, categories);
        if (category) {
            response.end(JSON.stringify(category));
        } else {
            response.statusCode = 404;
            response.end("NOT FOUND");
        }

    }else{
        response.end(JSON.stringify(categories));
    } 
    /* else {
        let newTodos = [];
        for (let i = 0; i < categories.length; i++) {
            if (!categories[i].deletedAt || url.query.showDeleted == "true") {
                newTodos.push(categories[i]);
            }
        }
        response.end(JSON.stringify(newTodos));
    } */
}


module.exports = {
    addCategory, listCategories, setupCurrentIdCategories
}