import React, { useEffect, useState } from 'react';

interface ProductT {
	_id: number,
	price: number,
	name: string,
	image: string,
}

const Product = (props: any) => {
	const product: ProductT = props.product;;
	const onAdd = props.onAdd;

	const addToCart = async (pid: number) => {
		const url = 'http://localhost:5000/cart/add/';
		const response = await fetch(url, {
			headers: {'Content-Type': 'application/json; charset=utf-8'}, 
			method: 'PATCH',
			body: JSON.stringify({
				cart_id: localStorage.getItem('cart'),
				pid: pid
			})
		});
	}
	return (
		<div className="product">
			<em> { product.name } </em>
			<em> { product.price } </em>
			<img src={product.image} alt="" />
			<button onClick={() => {
				addToCart(product._id);
				onAdd();
			}}>Add</button>
		</div>

	);
}
const Shop = ({ onAdd }: any) => {
	const [products, setProducts] = useState<ProductT[]>([]);

	useEffect(() => {
		fetch('http://localhost:5000/products', {headers: {'Content-Type': 'application/json'}})
		.then(response => response.json())
		.then(products => {
			console.log(products);
			setProducts(products);
		});
	}, []);


	return (
		<div className="shop">
			<h1>Shop</h1>
			<div className="products">
				{products.map((product: ProductT, key) => {
					return (
						<Product onAdd={onAdd} key={key} product={product} />
					)
				})}
			</div>
		</div>
	);
};

export { 
	Shop
};
