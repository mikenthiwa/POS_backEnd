import http from 'http';
import app from './app';
import env from '../environments';
import io from 'socket.io';

const server = http.createServer(app());

const port = env.PORT;
const socket = io(server);
socket.on('connection', (socket) => console.log('connected', socket));
server.listen(port, () => console.log(`Port ${port} is running`));
