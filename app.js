let http = require('http');
let url = require('url');
let fs = require('fs');

let handlers = {};
handlers.products = (req, res) => {
    fs.readFile('./view/products.html', (err, data) => {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
    });
};
handlers.users = (req, res) => {
    fs.readFile('./view/users.html', (err, data) => {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
    });
};
handlers.notFound = (req, res) => {
    fs.readFile('./view/notfound.html', (err, data) => {
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
    });
};

let router = {
    'users': handlers.users,
    'products': handlers.products
};

let server = http.createServer((req, res) => {
    let parseUrl = url.parse(req.url);
    let path = parseUrl.pathname;
    let trimPath = path.replace(/^\/+|\/+$/g, '');

    let chosenHandler = (typeof (router[trimPath]) !== 'undefined') ? router[trimPath] : handlers.notFound;
    chosenHandler(req, res);
});

server.listen(8000, () => {
    console.log('server running at http://localhost:8000');
});