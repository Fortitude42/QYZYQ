import React, { Component } from "react";
import axios from "axios";


export default class Home extends Component {
	constructor(props){
		super(props);
		this.state = {
			interests: [],
		}
	}

	componentDidMount() {
		axios.get('http://localhost:5000/interests/')
			.then(response => {
				console.log(response.data);
				this.setState({interests: response.data});
			})
			.catch((error) => console.log(error))

		
	}

	render() {
		return (
			<>Home page
			</>
		)
	}
}