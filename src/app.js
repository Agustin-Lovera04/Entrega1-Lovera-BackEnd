import express from 'express';
import { router as productManagerRouter } from './router/products-router.js';
import { router as cartManagerRouter } from './router/carts-router.js';

const PORT=8080;

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/api/products', productManagerRouter)
app.use('/api/carts', cartManagerRouter)

app.get('/',(req,res)=>{
    res.setHeader('Content-Type','text/plain');
    res.status(200).send('OK');
})

const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});
