const socket = io()

document.getElementById('addProductForm').addEventListener('submit', (event) => {
    event.preventDefault();
    console.log('boton clickeado')

    const productData = {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        code: document.getElementById('code').value,
        price: document.getElementById('price').value,
        stock: document.getElementById('stock').value,
        category: document.getElementById('category').value
    };
    

        socket.emit('addProduct', productData);
        console.log(productData)

        document.getElementById('title').value = '';
        document.getElementById('description').value = '';
        document.getElementById('code').value = '';
        document.getElementById('price').value = '';
        document.getElementById('stock').value = '';
        document.getElementById('category').value = '';
    });


    socket.on('listProd', (products) => {
        let divProducts = document.getElementById('container-products')
    divProducts.innerHTML= ''
    products.forEach((product) => {
        const listMod = `
            <div>
                <ul>
                    <li>
                        <h4>
                            ${product.title}
                            code: ${product.code}
                            ID: ${product.id}
                        </h4>
                    </li>
                </ul>
            </div>
        `;
        divProducts.innerHTML += listMod;
    });
    })


    document.getElementById('deleteProductForm').addEventListener('submit', (event) => {
        event.preventDefault();
        console.log('boton clickeado')
    
        const productID = document.getElementById('ID').value
        
            socket.emit('deleteProduct', productID);
            console.log(productID)
    
            document.getElementById('ID').value = '';
        });


        socket.on('listProdMod', (products) => {
            let divProducts = document.getElementById('container-products')
        divProducts.innerHTML= ''
        products.forEach((product) => {
            const listMod = `
                <div>
                    <ul>
                        <li>
                            <h4>
                                ${product.title}
                                code: ${product.code}
                                ID: ${product.id}
                            </h4>
                        </li>
                    </ul>
                </div>
            `;
            divProducts.innerHTML += listMod;
        });
        })
    