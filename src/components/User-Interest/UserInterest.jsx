import React, { Component } from "react";
import './UserInterest.css';



export default class UserInterest extends Component {
	constructor(props){
		super(props);	
		this.state = {
			interest: props.interest,
		}		
	}

	render() {
		return (
			<div className="h-250 ps-1 pe-1 pt-1">
				<div className="d-flex justify-content-center">
					<img className="rounded" height={250} width={"100%"} src={`/img/${this.state.interest.image}`} onError={(e)=>{e.target.onerror = null; e.target.src="/img/sample.webp"}} alt=""/>
				</div>
				<h6 className="mt-1 text-center">{this.state.interest.name}</h6>
			</div>
		)
	}
}