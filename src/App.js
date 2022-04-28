import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import './App.css'
import { Routes, Route} from "react-router-dom";
import Home from './components/Pages/Home/Home';
import Login from './components/Pages/Login/Login.js'
import Register from './components/Pages/Register/Register.js'


export default class App extends Component {	
		render() {
			return (
				<div>
					<Routes>
						<Route path="/home" element={<Home />} />
						<Route path="/login" element={<Login />}/>
						<Route path="/register" element={<Register />}/>
					</Routes>
				</div>
				 
			)
		}
}