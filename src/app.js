import express from 'express';
import {engine} from 'express-handlebars'
import { router as viewsRouter } from './router/viewsRouter.js';
import { __dirname } from './utils.js';
import {Server} from 'socket.io'


const PORT=3000;

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(`${__dirname}/public`))

/* CONFIGURAMOS HANDLEBARS */
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', `${__dirname}/views`);

/* MODULARIZAMOS Y REDIRIGIMOS A VIEWSROUTER */
app.use('/', viewsRouter)


const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});


export const io = new Server(server)


