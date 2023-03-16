import express from 'express';
import { router } from './Router';

const server = express();

server.use(express.json());
server.use(router)

server.listen(5000, () => console.log("🔥🔥🔥 Server on na porta 5000"))