import http from 'http';
import app from './app';
import env from '../../environments';

const server = http.createServer(app());
const port = env.PORT;
server.listen(port, () => console.log(`Port ${port} is running`));
