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
import User from "./Pages/User/User";
import axios from "axios";
import CreateInterest from './Pages/Create-Interest/CreateInterest'


export default class App extends Component {	
	constructor(props){
		super(props);
		this.state = {
			interests: [],
			users: [],
		}
	}

	interestList() {
		let res = []
		for (let inter of this.state.interests) {
			let path = "/interests/" + inter._id;
			res.push(<Route key= {path} path={path} element={<Interest interest={inter} />}/>)
		}

		return res;
	}
	
	usersList() {
		let res = []
		for (let user of this.state.users) {
			let path = "/users/" + user._id;
			res.push(<Route key= {path} path={path} element={<User user={user} />}/>)
		}

		return res;
	}

	componentDidMount() {
		axios.get('http://localhost:5000/interests/')
			.then(response =>	this.setState({interests: response.data}))
			.catch((error) => console.log(error))		
		
		axios.get('http://localhost:5000/users/')
			.then(response =>	this.setState({users: response.data}))
			.catch((error) => console.log(error))
	}



	render() {

		return (
			<div>
				<Navbar/>				
				<Routes>
					<Route path="/home" element={<Home />} key={'home'} />
					<Route path="/login" element={<Login />} key = 'login'/>
					<Route path="/register" element={<Register />} key = 'register' />
					<Route path="/create-interest" element={<CreateInterest	/>} key='create-interest' />
					{this.interestList()}
					{this.usersList()}
				</Routes>
			</div>
		)
	}
}