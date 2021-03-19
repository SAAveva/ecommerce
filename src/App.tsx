import React, {useState,useEffect} from 'react';
import './App.css';

import { BrowserRouter as Router, Route, Link} from 'react-router-dom';

import { Shop }  from './Shop';
import { Cart } from './Cart';
import { Signup, Signin } from './Login';
import { Buy } from './Buy';

const Menu = (props: any) => {
	const cart_size = props.cart_size;
	const loggedIn = props.loggedIn;

	const logout = () => {
		localStorage.removeItem('auth');
		window.location.reload();
	}

	return (
		<menu className="main-menu">
			<div className="menu">
				<li> <Link to="/shop"> Shop </Link> </li>
				<li> <Link to="/cart"> Cart ({cart_size}) </Link> </li>
				<li> <Link to="/about"> About </Link> </li>
			</div>
			<div className="login">
				{!loggedIn ? (
					<div>
						<li><Link to="/signup">Signup</Link></li>
						<li><Link to="/signin">Signin</Link></li>
					</div>)
					:<li className="logout" onClick={logout}>Logout</li>
				}
			</div>
		</menu>
	);
};


const About = () => {
	return (
		<>
			<h1>About us</h1>
			<p> A simple demo of a ecommerce store</p>
		</>
	);
};

function App() {	
	const [cartSize, setCartSize] = useState(0);
	
	const onAddItem = () => {
		setCartSize(cartSize + 1)
	}

	const Auth = () => {
		return localStorage.getItem('auth') ? true:false;
			
	}
	useEffect(() => {
		fetch('http://localhost:5000/cart/get_size/' + localStorage.getItem('cart'), {
			headers: { 'Content-Type': 'application/json'}

		})
		.then(response => response.json())
		.then(response => {
			setCartSize(response.count);
		});
	},[cartSize]);

	useEffect(() => {
		(async () => {  
			if (!localStorage.getItem('cart')) {
				await fetch('http://localhost:5000/cart/create', {headers: {'Content-Type': 'application/json'}, method: 'post'})
					.then(response => response.json())
					.then((response) => localStorage.setItem('cart', response.id))
					
			}
		})();		
	}, []);
  return (
	<Router>
		<div className="app">
			<Menu cart_size={cartSize} loggedIn={Auth()} />
			<Route exact={true} path="/shop" render={(props) => <Shop onAdd={onAddItem} />} />
			<Route exact={true} path="/cart" component={Cart} />
			<Route exact={true} path="/buy" component={Buy} />
			<Route exact={true} path="/signin" component={Signin} />
			<Route exact={true} path="/signup" component={Signup} />
			<Route path="/about" component={About} />
		</div>
	</Router>
  );
}

export default App;
