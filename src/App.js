import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import './App.css'
import './components/Navbar/Navbar.css'
import { Routes, Route} from "react-router-dom";
import Navbar from './components/Navbar/Navbar';
import Home from './Pages/Home/Home.jsx';
import Login from './Pages/Login/Login.jsx'
import Author from './Pages/Author/Author.jsx'
import Register from './Pages/Register/Register.jsx'
import Interest from "./Pages/Interest/Interest";
import User from "./Pages/User/User";
import axios from "axios";
import CreateInterest from './Pages/Create-Interest/CreateInterest'
import Sidebar from "./components/Sidebar/Sidebar";
import './components/Sidebar/Sidebar.css'


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

	authorList() {
		let res = []
		for (let inter of this.state.interests) {
			let path = "/authors/" + encodeURI(inter.author);			
			res.push(<Route key= {path} path={path} element={<Author author={inter.author} />}/>)
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
			<div className="pb-4">				
				<Navbar/>
				<div id="wrapper" className="pt-100">
					<Sidebar/>
				
					<div className="">
						<Routes>
							<Route path="" element={<Home types={['movie', 'book', 'music']}/>} key={'home'} />
							<Route path="/book" element={<Home types={['book']}/>} key={'home'} />
							<Route path="/movie" element={<Home types={['movie']}/>} key={'home'} />
							<Route path="/music" element={<Home types={['music']}/>} key={'home'} />
							<Route path="/login" element={<Login />} key = 'login'/>
							<Route path="/register" element={<Register />} key = 'register' />							
							<Route path="/create-interest" element={<CreateInterest	/>} key='create-interest' />
							{this.interestList()}
							{this.usersList()}
							{this.authorList()}
						</Routes>
					</div>
				</div>
			</div>
		)
	}
}