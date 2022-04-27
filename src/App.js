import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import './App.css'
import { Routes, Route} from "react-router-dom";
import Home from './components/pages/Home/Home';


export default class App extends Component {	
		render() {
			return (
				<Routes>					
					<Route path="/home" element={<Home />}/>
				</Routes>
			)
		}
}