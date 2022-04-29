import { toHaveAccessibleDescription } from '@testing-library/jest-dom/dist/matchers';
import React, { Component } from 'react';
import './Interest.css';

export default class Interest extends Component {
	constructor(props) {
		super(props);
		this.state = {
			interest: props.interest,
		}
	}
	
	render() { 
		return (
			<div className="ps-4 pe-4 d-flex pt-4">
				<div className="w-30 d-flex justify-content-center">
					<img height={420} width={320} src="/img/sample.webp"/>
				</div>
				<div className="ms-4 border border-1 rounded border-dark ps-4 pe-4 w-50">
					<h1 className="mt-4">{this.state.interest.name}</h1>
					<h3>About {this.state.interest.type}</h3>
					<span> {this.state.interest.description}</span>
				</div>
			</div>
		);
	}
}

