import axios from 'axios';
import React, { useState } from 'react';
import './CreateInterest.css'
import { useNavigate } from "react-router-dom";

function CreateInterest() {	
	const [interest, setInterest] = useState({
		name: '',
		author: '',
		type: 'Type',
		description: '',
		image: null
	})
	
	const [errorMessage, setErrorMessage] = useState({
		name: '',
		author: '',
		type: '',
		description: '',
	})	

	const navigate = useNavigate();
	


	function handleNameChange(event) {				
		setInterest({...interest, name: event.target.value})
	}
	
	function handleAuthorChange(event) {				
		setInterest({...interest, author: event.target.value})
	}

	function handleDescriptionChange(event) {		
		setInterest({...interest, description: event.target.value})
	}

	function handleTypeChange(event) {
		setInterest({...interest, type: event.target.value})
	}

	function handleImageChange(event) {			
		setInterest({...interest, image: event.target.files[0]})
	}	


	function handleSubmit(event) {
		event.preventDefault();

		setErrorMessage({
			name: interest.name.length === 0 ? 'Name should not be empty' : '',
			author: interest.author.length === 0 ? 'Author should not be empty' : '',
			description: interest.description.length === 0 ? 'Description should not be empty' : '',
			type: interest.type === 'Type' ? 'Choose a type' : ''
		})		
		
				
		if (interest.name.length === 0 || interest.author.length === 0 || interest.description.length === 0 || errorMessage.type.length === 'Type')
			return;		

		const formData = new FormData();
		formData.append('name', interest.name);
		formData.append('author', interest.author);
		formData.append('type', interest.type);
		formData.append('description', interest.description);		
		formData.append('image', interest.image);		
		
		axios.post('http://localhost:5000/interests/add', formData).then(response => {
			console.log(response.data);		
			navigate("/");
		}).catch((error) => console.log(error));
	}
	
	return (
		<div className="ps-4 pe-4 pt-4">
			<h1>New interest</h1>
			<div className="w-75 border border-dark rounded ps-4 pe-4 pt-4 pb-4 mt-4 position-relative bg-white">
				<div className="form-floating position-relative">
					<input type="text" className="form-control" id="floatingInputGrid" placeholder="Name" value={interest.name} onChange={handleNameChange} />
					<label htmlFor="floatingInputGrid">Name</label>
					<p className='position-absolute text-danger'>
						<small>
							{errorMessage.name}
						</small>
					</p>
				</div>

				<div className="mt-4 form-floating position-relative">
					<input type="text" className="form-control" id="floatingInputGrid" placeholder="Author" value={interest.author} onChange={handleAuthorChange} />
					<label htmlFor="floatingInputGrid">Author</label>
					<p className='position-absolute text-danger'>
						<small>
							{errorMessage.author}
						</small>
					</p>
				</div>

				
				<select defaultValue={interest.type} className="form-select form-select-lg mt-4" 
								aria-label=".form-select-lg example" onChange={handleTypeChange}>
					<option value='Type' disabled>Type</option>
					<option value="book">Book</option>
					<option value="movie">Movie</option>
					<option value="music">Music</option>
				</select>

				<p className='position-absolute text-danger'>
					<small>
						{errorMessage.type}
					</small>
				</p>

				<div className="form-floating mt-4">
					<textarea className="form-control" style={{height: "200px"}} placeholder="Leave a description here" 
										id="floatingTextarea" value={interest.description} onChange={handleDescriptionChange}></textarea>
					<label htmlFor="floatingTextarea">Description</label>
				</div>

				<p className='position-absolute text-danger'>
					<small>
						{errorMessage.description}
					</small>
				</p>

				<div className="mt-4">
					<label htmlFor="formFile" className="form-label">Choose a picture</label>
					<input className="form-control" name="image" type="file" id="formFile" onChange={handleImageChange} accept="image/png, image/jpeg, image/webp "/>
				</div>
			</div>

			<button type="button" className="mt-3 btn btn-primary btn-lg" onClick={handleSubmit}>Create</button>
		</div>
	);	
}


export default CreateInterest;