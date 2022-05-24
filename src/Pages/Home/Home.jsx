import React, { Component } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.css';	
import HomeInterest from "../../components/Home-Interest/HomeInterest";
import './Home.css'


export default class Home extends Component {
	constructor(props){
		super(props);
		this.state = {
			interests: [],
			types: props.types,
		}
	}

	componentDidMount() {
		axios.get('http://localhost:5000/interests/')
			.then(response =>	this.setState({interests: response.data.filter(interest => this.state.types.includes(interest.type))}))
			.catch((error) => console.log(error))		
	}

	interestList() {
		let res = []

		for (let inter of this.state.interests) {			
			res.push(
				<div className="ms-4 mb-4 text-dark t-d-n">
					<HomeInterest interest={inter}/>
				</div>);
		}

		return res;
	}

	render() {
		return (
			
			<div className="ps-4 pe-4 pt-4 w-90">				
				{this.interestList()}
			</div>			
		)
	}
}