// HTTP Methods
// add http://localhost:3000/
// update http://localhost:3000/
// delete http://localhost:3000/{id}

const http = require("http");
const url = require('node:url');
const PORT = 3000;
let grocery_list = [];
const { createLogger, transports, format } = require('winston');


// create the logger
const logger = createLogger({
    level: 'info', // this will log only messages with the level 'info' and above
    format: format.combine(
        format.timestamp(),
        format.printf(({ timestamp, level, message }) => {
            return `${timestamp} [${level}]: ${message}`;
        })
    ),
    transports: [
        new transports.Console(), // log to the console
        new transports.File({ filename: 'info.log', level: 'info' }),
        new transports.File({ filename: 'error.log', level: 'error' }),
    ]
})


let grocery_item = { "id": 0, "name": "name", "quantity": 10, "price": 5.0, "purchased": false };
let grocery_item2 = { "id": 1, "name": "name2", "quantity": 10, "price": 5.0, "purchased": false };
let grocery_item3 = { "id": 2, "name": "name3", "quantity": 10, "price": 5.0, "purchased": false };
grocery_list.push(grocery_item);
grocery_list.push(grocery_item2);
grocery_list.push(grocery_item3);

function add_grocery(name, quantity, price, purchased) {
    let grocery_item = { "name": name, "quantity": quantity, "price": price, "purchased": purchased };
    grocery_list.push(grocery_item);
    grocery_list[grocery_list.length - 1]["id"] = grocery_list.length - 1;
    return grocery_list[grocery_list.length - 1];
}


function update_grocery(id, name, quantity, price, purchased) {
    let grocery_item = { "id": id, "name": name, "quantity": quantity, "price": price, "purchased": purchased };
    grocery_list[id] = grocery_item;

    return grocery_list[id];
}

function get_grocery(id) {
    return grocery_list[id];
}

const server = http.createServer((req, res) => {

    // GET
    if (req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(grocery_list));

        //POST
    } else if (req.method === 'POST') {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk;
        });
        req.on('end', () => {
            const data = JSON.parse(body);

            let grocery = add_grocery(data.name, parseInt(data.quantity), parseFloat(data.price), data.purchased);
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Resource Created Successfully!', grocery }));
            logger.info(" ADD " + JSON.stringify(grocery));


        });

    } else if (req.method === "PUT") {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk;
        });
        req.on('end', () => {
            const data = JSON.parse(body);
            let hasKey = grocery_list.hasOwnProperty(parseInt(data.id));
            if (hasKey) {
                let grocery = update_grocery(parseInt(data.id), data.name, parseInt(data.quantity), parseFloat(data.price), data.purchased);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Resource Created Successfully!', grocery }));
                logger.info(" UPDATE " + JSON.stringify(grocery));

            } else {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('Not Found');
                logger.error(" UPDATE ID not found " + data.id);

            }
        });
    } else if (req.method === "DELETE") {
        const id = req.url.substring(1);
        let hasKey = grocery_list.hasOwnProperty(parseInt(id));
        if (hasKey) {
            let grocery = get_grocery(parseInt(id));
            grocery_list.splice(parseInt(id), 1);
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Resource Deleted Successfully!', grocery }));
            logger.info(" DELETE " + JSON.stringify(grocery));

        } else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Not Found');
            logger.error(" DELETE ID not found " + id);

        }

    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }

})

server.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
})