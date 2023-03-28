function addCategory(request, response, url, connection) {
  response.statusCode = 201;
  let data = "";
  let query = `INSERT INTO category (name)`;
  request.on('data', (chunk) => {
    data += chunk;
  });
  request.on("end", () => {
    let task = JSON.parse(data);
    if (task.name) {
      query += `VALUES ('${task.name}')`;
    } else {
      response.statusCode = 400;
      response.end("BAD REQUEST");
    }
    console.log(query);
    connection.query(query, (error, result) => {
      if (error) {
        response.statusCode = 400;
        response.end("BAD REQUEST");
      } else {
        response.end(JSON.stringify(result));
      }
    });
  });
}

function listCategories(request, response, url, connection) {
  response.setHeader('Content-type', 'application/json')
  let query = `SELECT * FROM category`;
  if (url.query.id) {
    query += ` WHERE id=${url.query.id}`;
    if (url.query.showDeleted != "1") {
      query += ` AND deleted_at IS NULL`;
    }
  } else {
    if (url.query.showDeleted != "1") {
      query += ` WHERE deleted_at IS NULL`;
    }
  }
  console.log(query);
  connection.query(query, (error, result) => {
    if (error) {
      response.statusCode = 500;
      response.end("SERVER ERROR");
    } else {
      response.end(JSON.stringify(result));
    }
  });
}

function deleteCategory(request, response, url, connection) {
  if (url.query.id) {
    let deletedAt = (new Date()).toISOString().slice(0,19).replace('T', ' ');
    connection.query(`UPDATE category SET deleted_at='${deletedAt}' WHERE id=${url.query.id}`
      , (error, result) => {
        if (error) {
          response.statusCode = 500;
          response.end("SERVER ERROR");
        } else {
          response.statusCode = 200;
          response.end();
        }
      });
      console.log(deletedAt);
  } else {
    response.statusCode = 400;
    response.end("BAD REQUEST");
  }
}

function updateCategory(request, response, url, connection) {
  if (url.query.id) {
    let data = "";
    request.on('data', (chunk) => {
      data += chunk;
    });
    request.on("end", () => {
      let task = JSON.parse(data);
      if (task.name) {
        task.updatedAt = (new Date()).toISOString().slice(0, 19).replace('T', ' ');
        connection.query(`UPDATE category SET name='${task.name}', updated_at='${task.updatedAt}' WHERE id=${url.query.id}`
          , (error, result) => {
            if (error) {
              response.statusCode = 500;
              response.end("SERVER ERROR");
            } else {
              response.statusCode = 201;
              response.end("CREATED");
            }
          });
        response.end();
      } else {
        response.statusCode = 400;
        response.end("BAD REQUEST");
      }
    });
  } else {
    response.statusCode = 400;
    response.end("BAD REQUEST");
  }
}

module.exports = {
  listCategories, addCategory, updateCategory, deleteCategory
}