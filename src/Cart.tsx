import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface ProductT {
    _id: string,
    name: string,
    price: number,
    image: string
}

interface OrderedT {
    [key: string]: ProductT[]
}
const Cart = () => {
    const [products, setProducts] = useState<OrderedT>({});

    useEffect(() => {
        fetch('http://localhost:5000/cart/' + localStorage.getItem('cart'), {
            headers: { 'Content-Type': 'application/json'}
        })
        .then(response => response.json())
        .then(p => {
            const ordered: OrderedT = {};
            p.forEach((product: ProductT) => {
                if (!ordered[product._id]) {
                    ordered[product._id] = [product];
                }
                else {
                    ordered[product._id].push(product);
                }
            })
            setProducts(ordered);
        });
    }, []);

    const update = (id: string, amount: number) => {
        if (amount === 1) {
            products[id].push(products[id][0]);

            fetch('http://localhost:5000/cart/add' , {
                headers: {'content-Type': 'application/json'},
                method: 'PATCH',
                body: JSON.stringify({
                    pid: id,
                    cart_id: localStorage.getItem('cart')
                })
            })
        }
        
        else {
            products[id].pop();
            if (products[id].length === 0) {
                delete products[id];
            }

            fetch('http://localhost:5000/cart/delete', {
                headers: { 'Content-Type': 'application/json'},
                method: 'PATCH',
                body: JSON.stringify({
                    pid: id,
                    cart_id: localStorage.getItem('cart')
                })
            })
        }
        
        console.log(products);
        setProducts({...products});
    }
    return (
        <div className="cart">
            <h1>Cart</h1>
            {Object.keys(products).map((id, idx: number) => {
                const product = products[id][0];
                const size = products[id].length;
                return (
                    <Product product={product} size={size} onUpdate={update} key={idx} />
                );
            })}
            <br />
            <Link to="/buy" className="buy-btn">Buy</Link>
        </div>
    )
};

interface ProductArgs {
    product: ProductT,
    onUpdate: (id: string, amount: number) => void,
    size: number
}
const Product = ({product,onUpdate, size}: ProductArgs) => {    
    return (
        <div className="product">
            <img src={product.image} style={{maxWidth: 100}} />
            <h3>{product.name}</h3>
            <p>Price: {product.price}</p>
            <div className="buttons">
                <span className="">{size}</span>
                <button onClick={() => onUpdate(product._id, 1)}>+</button>
                <button onClick={() => onUpdate(product._id, -1)}>-</button>
                
            </div>
        </div>
    );
}

export {
    Cart
};