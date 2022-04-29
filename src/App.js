import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import './App.css'
import './components/Navbar/Navbar.css'
import { Routes, Route} from "react-router-dom";
import Navbar from './components/Navbar/Navbar';
import Home from './Pages/Home/Home.jsx';
import Login from './Pages/Login/Login.jsx'
import Register from './Pages/Register/Register.jsx'
import Interest from "./Pages/Interest/Interest";
import axios from "axios";


export default class App extends Component {	
	constructor(props){
		super(props);
		this.state = {
			interests: [],
		}
	}

	interestList() {
		let res = []
		for (let inter of this.state.interests) {
			let path = "/interests/" + inter._id;
			res.push(<Route path={path} element={<Interest interest={inter} />}/>)
		}

		return res;
	}
	
	componentDidMount() {
		axios.get('http://localhost:5000/interests/')
			.then(response =>	this.setState({interests: response.data}))
			.catch((error) => console.log(error))		
	}

	render() {

		return (
			<div>
				<Navbar/>
				<Routes>
					<Route path="/home" element={<Home />} />
					<Route path="/login" element={<Login />}/>
					<Route path="/register" element={<Register	 />}/>
					{this.interestList()}
				</Routes>
			</div>
		)
	}
}