/*jshint esversion: 8 */

const Koa = require('koa');
const Router = require('koa-router');
const app = new Koa();
const router = Router();
var bodyParser = require('koa-bodyparser');
const server = require('http').createServer(app.callback());
const fs = require('fs');
const io = require('socket.io')(server);

const port = 80;
const markers = [];

router.get('/', async function (ctx) {
    ctx.response.type = 'html';
    ctx.response.body = fs.createReadStream('./index.html');
});

router.get('/client', async function (ctx) {
    ctx.response.type = 'html';
    ctx.response.body = fs.createReadStream('./client.html');
});

io.on('connect', (socket) => {
    // console.log('user connected: ' + socket.id);
    socket.on('gpsIn', function (msg) {
        msg.id = socket.id;
        console.log('GPS in : ' + JSON.stringify(msg));
        io.emit('gpsOut', msg);
    });
});

io.on('connection', (socket) => {
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

server.listen(port, () => {
    console.log('listening on *:' + port);
});
