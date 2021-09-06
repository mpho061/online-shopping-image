import { useEffect, useState } from 'react';
import { db, auth } from '../Firebase';
import { useHistory } from 'react-router-dom';

const Shop = () => {

    const [products, setProducts] = useState([])
    let history = useHistory()
    let user = auth.currentUser

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
    const addToCart = async (product) => {
        try {
            if (user) {
                db.collection("cart").add({
                    uid: user.uid,
                    product
                }).then(
                    alert("Item added to cart")
                ).catch((error)=>{
                    console.log(error.message);
                })
                
            } else {
                alert("Please Login")
            }
        } catch (error) {
            console.log(error.message)
        }
    }
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
                                    <button onClick={() => addToCart(product)}> Add To Cart</button>
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