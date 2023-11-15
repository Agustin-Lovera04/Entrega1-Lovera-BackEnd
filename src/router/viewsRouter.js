import { Router } from 'express';
import { router as productManagerRouter, productPrueba } from './products-router.js';
import { io } from '../app.js';
export const router=Router()

/* CENTRO DE CONTROL DE RUTAS */


/* ENVIAMOS AL ROUTER DE MANEJO DE PRODUCTOS, POR CONSIGNA MOSTRAR EN HOME */
router.use('/', productManagerRouter)


router.get('/realtimeproducts', async (req, res) => {
    try {
        let products = productPrueba.getProducts();  // Obtén los productos antes de renderizar

        io.on('connection', socket => {
            console.log(`Se conectó un cliente, ID: ${socket.id}`);
        

        socket.on('addProduct', productData=>{

            let newProd = productPrueba.addProduct(productData)
            if(!newProd){
                console.log('Error')
            }
            
            products = productPrueba.getProducts()
            io.emit('listProd', (products))
        })
    
        socket.on('deleteProduct', productID => {
            let deleteProduct = productPrueba.deleteProduct(productID)
            if(!deleteProduct){
                console.log('Error al borrar')
            }

            products = productPrueba.getProducts()
            io.emit('listProdMod', (products))
        })
    
    
    });
            
        res.status(200).render('realTimeProducts', { products });
    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).send('Error interno del servidor');
    }
});
