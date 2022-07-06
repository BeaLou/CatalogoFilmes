//importando  as dependencias e variaveis de ambiente que serão usadas
import 'dotenv/config'
import { conn } from './repository/connection.js'

import express from 'express'
import cors from 'cors'

const server = express();
server.use(cors());
server.use(express.json());




server.listen(process.env.PORT, () => console.log(`API conectada na porta ${process.env.PORT}`));