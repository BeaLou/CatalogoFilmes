//importando  as dependencias e variaveis de ambiente que serão usadas
import 'dotenv/config'
import usuarioController from './controller/usuarioController.js'
import express from 'express'
import cors from 'cors'

const server = express();
server.use(cors());
server.use(express.json());

//configuração de endpoints
server.use(usuarioController);


server.listen(process.env.PORT, () => console.log(`API conectada na porta ${process.env.PORT}`));