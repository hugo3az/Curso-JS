const http = require("http");
const url = require("url");

http.createServer((request, response) => {
    const reqUrl = url.parse(request.url, true);
    console.log("Nova Request", reqUrl.pathname);
    response.setHeader('Content-Type', 'html');

    if (reqUrl.pathname == "/feed") {
        if(reqUrl.query.order == "asc"){
            response.end("<html><body><ul><li>1</li><li>2</li><li>3</li></ul></body></html>");
        }else if(reqUrl.query.order == "desc"){
            response.end("<html><body><ul><li>3</li><li>2</li><li>1</li></ul></body></html>");
        }else{
            response.statusCode = 404;
            response.end();
        }
        
    } else if (reqUrl.pathname == "/home") {
        if(reqUrl.query.nome != ""){
            response.end(reqUrl.query.nome);
        }
       
    }
    else if (reqUrl.pathname == "/settings") {
        if(reqUrl.query.senha == "1234"){
          response.end("<h1>Bem vindo a pagina de Configuracoes</h1>");
        }else{
            response.statusCode = 403;
            response.end();
        }       

    }else{
        response.end();
    }
}).listen(8000);