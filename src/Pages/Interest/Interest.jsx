import React, { useEffect, useState } from 'react';
import './Interest.css';
import axios from 'axios';
import CommentSection from '../../components/CommentSection/CommentSection';

function Interest(props) {
	const state = props;
	const [commentLists, setCommentLists] = useState([]);
	const postData = {
		postId: state.interest._id,
	}
	
	const updateComment =  (newComment) => {
		console.log(newComment);
        setCommentLists(commentLists.concat(newComment))
    }

	useEffect(() => {
        axios.post('http://localhost:5000/comments/getComments', postData)
            .then(response => {
                if (response.data.success) {
                    setCommentLists(response.data.comments)
                } else {
                    alert('Failed to get video Info')
                }
            })
	})

	return (
		<div>
		<div className="ps-4 pe-4 d-flex pt-4">
			<div className="w-30 d-flex justify-content-center">
				<img height={420} width={"100%"} src={`/img/${state.interest.image}`} onError={(e)=>{e.target.onerror = null; e.target.src="/img/sample.webp"}} alt=""/>
			</div>
			<div className="ms-4 border border-1 rounded border-dark ps-4 pe-4 w-50">
				<h1 className="mt-4">{state.interest.name}</h1>
				<h5>Author: {state.interest.author}</h5>					
				<h3>About {state.interest.type}</h3>
				<span className='break'> {state.interest.description}</span>
			</div>
		</div>
		<CommentSection CommentLists = {commentLists} postId={state.interest._id} refreshFunction = {updateComment}/>
		</div>
	);
}

export default Interest;