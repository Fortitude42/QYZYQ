import React, { Component } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.css';	
import Interest from "../../components/Interest/Interest";
import './Home.css'


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

	interestList() {
		const res = []
		for (let i = 0; i < this.state.interests.length; i += 4) {
			let currentRow = [];
			for (let j = 0; j < 4 && i + j < this.state.interests.length; ++j)
				currentRow.push(this.state.interests[i + j])

			res.push(
				<div className="d-flex justify-content-center">
					{currentRow.map(inter =>
						<div className="w-20 ms-4 mb-4">
							<Interest interest={inter}/>
						</div>)
					}
				</div>
			)
		}
		return res;
	}

	render() {
		return (
			
			<div className="ps-4 pe-4 pt-4">
				{this.interestList()}
			</div>			
		)
	}
}