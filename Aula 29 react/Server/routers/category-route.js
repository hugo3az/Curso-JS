function addCategory(request, response, url, connection) {
  response.statusCode = 201;
  let data = "";
  let query = `INSERT INTO category (name)`;
  request.on('data', (chunk) => {
    data += chunk;
  });
  request.on("end", () => {
    let category = JSON.parse(data);
    if (category.name) {
      connection.query(`INSERT INTO category (name) VALUES ('${category.name}')`
        , (error, result) => {
          if (error) {
            response.statusCode = 500;
            response.end("SERVER ERROR");
          } else {
            response.statusCode = 201;
            response.end("CREATED");
          }
        });
    } else {
      response.statusCode = 400;
      response.end("BAD REQUEST");
    }
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
    connection.query(`UPDATE category SET deleted_at=NOW() WHERE id=${url.query.id}`
      , (error, result) => {
        if (error) {
          response.statusCode = 500;
          response.end("SERVER ERROR");
        } else {
          response.statusCode = 200;
          response.end("DELETED");
        }
      });
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
        connection.query(`UPDATE category SET name='${task.name}', updated_at=NOW() WHERE id=${url.query.id}`
          , (error, result) => {
            if (error) {
              response.statusCode = 500;
              response.end("SERVER ERROR");
            } else {
              response.statusCode = 200;
              response.end("UPDATED");
            }
          });
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