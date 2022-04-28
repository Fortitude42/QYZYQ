import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import './App.css'
import './components/Navbar/Navbar.css'
import { Routes, Route} from "react-router-dom";
import Navbar from './components/Navbar/Navbar';
import Home from './components/Pages/Home/Home';
import Login from './components/Pages/Login/Login.jsx'
import Register from './components/Pages/Register/Register.jsx'


export default class App extends Component {	
		render() {

			return (
				<div>
					<Navbar/>
					<Routes>
						<Route path="/home" element={<Home />} />
						<Route path="/login" element={<Login />}/>
						<Route path="/register" element={<Register	 />}/>
					</Routes>
				</div>
			)
		}
}