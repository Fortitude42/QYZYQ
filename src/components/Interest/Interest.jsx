import React, { Component } from "react";
import './Interest.css';



export default class Interest extends Component {
	constructor(props){
		super(props);	
		this.state = {
			interest: props.interest,
		}		
	}

	render() {
		return (
			<div className="border border-1 border-dark rounded ps-2 h-300 pt-2 pe-2">
				<div className="d-flex justify-content-center">
					<img height={220} width={"80%"} src={`/img/${this.state.interest.image}`} onError={(e)=>{e.target.onerror = null; e.target.src="/img/sample.webp"}} alt=""/>
				</div>
				<h4 className="text-center">{this.state.interest.name}</h4>
			</div>
		)
	}
}