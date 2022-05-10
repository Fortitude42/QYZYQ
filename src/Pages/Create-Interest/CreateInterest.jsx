import axios from 'axios';
import React, { Component } from 'react';
import './CreateInterest.css'

export default class CreateInterest extends Component {
	constructor(props) {
		super(props);
		this.fileInput = React.createRef();
		this.state = {
			name: "",
			description: "",
			image: null,
			type: "Type",
			nameError: "",
			typeError: "",
			descriptionError: "",
		}

		this.handleNameChange = this.handleNameChange.bind(this);
		this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
		this.handleTypeChange = this.handleTypeChange.bind(this);
		this.handleImageChange = this.handleImageChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleNameChange(event) {
		this.setState({name: event.target.value});
	}

	handleDescriptionChange(event) {
		this.setState({description: event.target.value});
	}

	handleTypeChange(event) {
		this.setState({type: event.target.value});
	}

	handleImageChange(event) {	
		this.setState({image: event.target.files[0]});		
	}	


	handleSubmit(event) {
		event.preventDefault();		

		this.setState({nameError: this.state.name.length === 0 ? 'Name should not be empty' : ''})
		this.setState({typeError: this.state.type === 'Type' ? 'Choose a type' : ''})
		this.setState({descriptionError: this.state.description.length === 0 ? 'Description should not be empty' : ''})
		

		if (this.state.nameError.length > 0 || this.state.typeError.length > 0 || this.state.descriptionError.length > 0)
			return;

		const formData = new FormData();
		formData.append('name', this.state.name);
		formData.append('type', this.state.type);
		formData.append('description', this.state.description);		
		formData.append('image', this.state.image);
		
		
		axios.post('http://localhost:5000/interests/add', formData).then(response => {
			console.log(response.data);
		}).catch((error) => console.log(error));
	}
	
	render() { 
		return (
			<div className="ps-4 pe-4 pt-4">
				<h1>New interest</h1>
				<div className="w-75 border border-dark rounded ps-4 pe-4 pt-4 pb-4 mt-4 position-relative">
					<div className="form-floating position-relative">
						<input type="text" className="form-control" id="floatingInputGrid" placeholder="Name" value={this.state.name} onChange={this.handleNameChange} />
						<label htmlFor="floatingInputGrid">Name</label>
						<p className='position-absolute text-danger'>
							<small>
								{this.state.nameError}
							</small>
						</p>
					</div>

					
					<select defaultValue={this.state.type} className="form-select form-select-lg mt-4" 
									aria-label=".form-select-lg example" onChange={this.handleTypeChange}>
						<option value='Type' disabled>Type</option>
						<option value="book">Book</option>
						<option value="movie">Movie</option>
						<option value="music">Music</option>
					</select>

					<p className='position-absolute text-danger'>
						<small>
							{this.state.typeError}
						</small>
					</p>

					<div className="form-floating mt-4">
						<textarea className="form-control" style={{height: "100px"}} placeholder="Leave a description here" 
											id="floatingTextarea" value={this.state.description} onChange={this.handleDescriptionChange}></textarea>
						<label htmlFor="floatingTextarea">Description</label>
					</div>

					<p className='position-absolute text-danger'>
						<small>
							{this.state.descriptionError}
						</small>
					</p>

					<div className="mt-4">
						<label htmlFor="formFile" className="form-label">Choose a picture</label>
						<input className="form-control" name="image" type="file" id="formFile" onChange={this.handleImageChange} accept="image/png, image/jpeg"/>
					</div>
				</div>

				<button type="button" className="mt-3 btn btn-primary btn-lg" onClick={this.handleSubmit}>Create</button>
			</div>
		);
	}
}