import React, { Component } from 'react';
import './User.css';
import axios from 'axios';
import Interest from '../../components/Interest/Interest';

export default class Users extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: props.user,
			movieInterests: [],
			musicInterests: [],
			bookInterests: [],
		}
	}

	componentDidMount() {
		axios.get('http://localhost:5000/interests/')
			.then(response => this.setState({
				movieInterests: response.data.filter(interest => interest.type === 'movie'),
				musicInterests: response.data.filter(interest => interest.type === 'music'),
				bookInterests: response.data.filter(interest => interest.type === 'book'),
			}))
			.catch((error) => console.log(error))
	}

	interestList(interests) {
		let res = []
		for (let i = 0; i < interests.length; i += 4) {
			let currentRow = [];
			for (let j = 0; j < 4 && i + j < interests.length; ++j)
				currentRow.push(interests[i + j])

			res.push(
				<div className="d-flex ">
					{currentRow.map(inter => {
						let path = "/interests/" + inter._id;
						return (
							<a href={path} className="w-20 mb-4 text-dark t-d-n me-4">
								<Interest interest={inter}/>
							</a>)
					})
					}
				</div>
			)
		}
		return res;
	}


	render() { 
		return (
				<div>
					<div className='d-flex ps-4 pt-4 pb-4 border-bottom'>
						<div className="w-5 d-flex justify-content-center">
							<img className='card' height={220} width={"90%"} src='/img/sample.webp'  alt=""/>
						</div>
						<div className='ms-4'>
							<h2 className='border-bottom'>{this.state.user.firstname} {this.state.user.lastname}</h2>
							<h5>Read: {this.state.bookInterests.length} books</h5>
							<h5>Watched: {this.state.movieInterests.length} movies</h5>
							<h5>Listened: {this.state.musicInterests.length} tracks</h5> <br/>
							<span className='text-muted'>Registered: 2 months ago</span>
						</div>
					</div>

					<div className='ps-4 pt-4'>
						<h2>MUSIC</h2>
						{this.interestList(this.state.musicInterests)}
						<h2>MOVIES</h2>
						{this.interestList(this.state.movieInterests)}
						<h2>BOOKS</h2>
						{this.interestList(this.state.bookInterests)}
					</div>
				</div>
		);
	}
}