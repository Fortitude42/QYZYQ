import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import './App.css'
import './components/Navbar/Navbar.css'
import { Routes, Route} from "react-router-dom";
import Home from './components/pages/Home/Home';
import Navbar from './components/Navbar/Navbar';


export default class App extends Component {	
		render() {
			return(
				<div>
					<Navbar/>
					<Routes>					
						<Route path="/home" element={<Home />}/>
					</Routes>
				</div>
			)
		}
}