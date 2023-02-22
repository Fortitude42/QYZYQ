import React, { useState, useEffect } from 'react';
import './Author.css';
import UserInterest from '../../components/User-Interest/UserInterest';
import { findInterestsByAuthor } from '../../Services/InterestService';

function User(props) {		
	const [interests, setInerests] = useState({
		movies: [],
		music: [],
		books: [],
	})	

	async function asyncInterestSetter() {
		const allInterests = await findInterestsByAuthor(props.author);		
		console.log(allInterests);
		setInerests({
			movies: allInterests.filter(inter => inter.type === 'movie'),
			music: allInterests.filter(inter => inter.type === 'music'),
			books: allInterests.filter(inter => inter.type === 'book'),
		})
	}

	useEffect(() =>  {		
		asyncInterestSetter();
	}, [])

	function interestList(interests) {
		let res = []

		const rowSize = 3;
		for (let i = 0; i < interests.length; i += rowSize) {
			let currentRow = [];
			for (let j = 0; j < rowSize && i + j < interests.length; ++j)
				currentRow.push(interests[i + j])

			res.push(
				<div className="d-flex ">
					{currentRow.map(inter => {
						let path = "/interests/" + inter._id;
						return (
							<a href={path} className="w-22 mb-40 text-dark t-d-n me-90">
								<UserInterest interest={inter}/>
							</a>)
					})
					}
				</div>
			)
		}
		return res;
	}



	
	return (
			<div className='pe-4'>
				<div className='d-flex ps-4 pt-4 pb-4 border-bottom'>					

					<div className='ms-4'>
						<h2 className='border-bottom'>{props.author}</h2>
						{interests.books.length > 0 && <h5>Books: {interests.books.length} books</h5>}
						{interests.movies.length > 0 && <h5>Movies: {interests.movies.length} movies</h5>}
						{interests.music.length > 0 && <h5>Music: {interests.music.length} tracks</h5>} <br/>						
					</div>
				</div>

				<div className='pt-4 ps-4'>
					<div className='ps-10 border border-1 border-dark rounded ps-4 pt-3 bg-light'>
						{interests.music.length + interests.books.length + interests.movies.length === 0 && <h6 className=''>No items</h6>}
						{interests.music.length > 0 && <h4>MUSIC</h4> }
						{interestList(interests.music)}
						
						<div className='border-bottom mt-4'></div>					
						{interests.movies.length > 0 && <h4 className=''>MOVIES</h4>}
						{interestList(interests.movies)}
						
						<div className='border-bottom mt-4'></div>					
						{interests.books.length > 0 && <h4>BOOKS</h4>}
						{interestList(interests.books)}
					</div>
				</div>
			</div>
	);

}

export default User;