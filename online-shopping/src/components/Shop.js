import { useEffect, useState } from 'react';
import { db } from '../Firebase'

const Shop = () => {

    const [products, setProducts] = useState([])
    const fetchProducts = async () => {
        db.collection('Products').onSnapshot((snapshot) => {
            const prodData = []
            snapshot.forEach((doc) => {
                prodData.push({ ...doc.data(), id: doc.id })
            })
            setProducts(prodData)
            console.log(products);
        })
    }
    useEffect(() => {
        fetchProducts()
    }, [])

    return (
        <div className="prices">
            <div className="container">
                <div className="row">
                    {products && products.map(product => (
                        <div>
                            <div className="product_image">
                                <img src={product.ProductImage} />

                                <div className="product_name">
                                    <h1>
                                        {product.ProductName}
                        
                                    </h1>
                                </div>
                                <div className="product_price">
                                    <h1> R{product.ProductPrice}
                                    </h1>
                                </div>

                                <div className="product_Desc">
                                    <h1> {product.ProductDescription}
                                    </h1>
                                </div>

                               
                            </div>
                        </div>
                    )
                    )

                    }
                </div>
            </div>

        </div>
    );
};

export default Shop;