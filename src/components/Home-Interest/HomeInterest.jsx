import React, { Component } from "react";
import './HomeInterest.css';



export default class HomeInterest extends Component {
	constructor(props){
		super(props);	
		this.state = {
			interest: props.interest,
			shortDescription: props.interest.description.substring(0, Math.min(props.interest.description.length, 450)),
			path: 'interests/' + props.interest._id,
		}
	}	


	render() {
		return (
			<div className="border border-1 border-dark rounded ps-2 h-360 pt-4 pe-4 ps-4 w-100">
				<div className="d-flex w-100">
					<a className="w-25" href={this.state.path} >
						<img className="rounded" height={260} width={"100%"} src={`/img/${this.state.interest.image}`} onError={(e)=>{e.target.onerror = null; e.target.src="/img/sample.webp"}} alt=""/>
					</a>

					<div className="w-60 ms-4">
						<a href={this.state.path} className="t-d-n text-dark">
							<h3 className=" mt-1">{this.state.interest.name}</h3>						
						</a>

						<span>{this.state.shortDescription}</span>
						{this.state.interest.description.length > 450 &&  <a href={this.state.path} className="t-d-n text-secondary">
							...see more
						</a>}
					</div>

				</div>
				
			</div>
		)
	}
}