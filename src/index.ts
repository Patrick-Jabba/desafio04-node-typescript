import 'reflect-metadata';
import express from 'express';
import { router } from './Router';
import { AppDataSource } from './database';

const server = express();
AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })

server.use(express.json());
server.use(router)

server.listen(5000, () => console.log("🔥🔥🔥 Server on na porta 5000"))