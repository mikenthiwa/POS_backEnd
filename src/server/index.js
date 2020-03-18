import http from 'http';
import app from './app';
import env from '../environments';
import Io from 'socket.io';

import socketConnection from '../helpers';

const server = http.createServer(app());

const port = env.PORT;
export const io = Io(server);
socketConnection(io);

server.listen(port, () => console.log(`Port ${port} is running`));

