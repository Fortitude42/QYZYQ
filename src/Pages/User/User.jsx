import React, { useState, useEffect } from 'react';
import './User.css';
import axios from 'axios';
import Interest from '../../components/Interest/Interest';

function User(props) {		
	const [interests, setInerests] = useState({
		movies: [],
		music: [],
		books: [],
	})	

	const [errorMessage, setErrorMessage] = useState(null);
	const [changedPicture, setChangedPicture] = useState(null);
	const [clickedToChangePicture, setClickedToChangePicture] = useState(false);	

	

	useEffect(() =>  {		
		axios.get('http://localhost:5000/interests/')
			.then(response => setInerests({
				movies: response.data.filter(interest => interest.type === 'movie'),
				music: response.data.filter(interest => interest.type === 'music'),
				books: response.data.filter(interest => interest.type === 'book'),
			}))
			.catch((error) => console.log(error))
	})

	function interestList(interests) {
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

	function handlePictureChange(event) {
		setChangedPicture(event.target.files[0]);
	}

	function isUserSure() {					
		return window.confirm('Do you really want to change your profile picture?');
	}	
	

	function handleChangePictureClick(event) {				
		if (!isUserSure())
			return;

		if (changedPicture === null) {
			setErrorMessage('Cannot read picture file');
			return;
		}

		setErrorMessage('');
		
		const formData = new FormData();
		formData.append("firstName", props.user.firstName);
		formData.append("lastName", props.user.lastName);
		formData.append("email", props.user.email);
		formData.append("picture", changedPicture);		
				
		axios.post('http://localhost:5000/users/update/' + props.user._id, formData).then(response => {
			console.log(response.data);					
			return window.location.reload();							
		}).catch((error) => console.log(error));
	}

	function getChangePictureContent() {		
		if (!clickedToChangePicture)
			return (<a href="#" onClick={	e=> {setClickedToChangePicture(true);}} className="stretched-link text-secondary">Change your profile picture</a>);
			 
		return (
			<div className='position-relative'>
				<input className="form-control form-control-sm w-90" onChange={handlePictureChange} id="picture" type="file" />
				<button type="button" onClick={handleChangePictureClick} className="btn btn-sm mt-1 btn-outline-secondary"> Submit</button> <br/>
				<small className='text-danger mt-1 position-absolute'>{errorMessage}</small>
			</div>
		);
	}


	
	return (
			<div>
				<div className='d-flex ps-4 pt-4 pb-4 border-bottom'>
					<div className='w-20'>
						<div className="w-5 d-flex justify-content-center">
							<img className='card ' height={240} width={"90%"} src={`/img/${props.user.picture}`} onError={(e)=>{e.target.onerror = null; e.target.src="/img/sample.webp"}}  alt=""/>
						</div>

						<div className="mb-3 ps-4 pt-2">							
							{getChangePictureContent()}								
						</div>

					</div>

					<div className='ms-4'>
						<h2 className='border-bottom'>{props.user.firstName} {props.user.lastName}</h2>
						<h5>Read: {interests.books.length} books</h5>
						<h5>Watched: {interests.movies.length} movies</h5>
						<h5>Listened: {interests.music.length} tracks</h5> <br/>
						<span className='text-muted'>Registered: 2 months ago</span>
					</div>
				</div>

				<div className='ps-4 pt-4'>
					<h2>MUSIC</h2>
					{interestList(interests.music)}
					<h2>MOVIES</h2>
					{interestList(interests.movies)}
					<h2>BOOKS</h2>
					{interestList(interests.books)}
				</div>
			</div>
	);

}

export default User;