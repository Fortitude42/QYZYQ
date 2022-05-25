import React, { useEffect, useState } from 'react';
import './Interest.css';
import axios from 'axios';
import CommentSection from '../../components/CommentSection/CommentSection';
import { getCurrentUser } from '../../Services/UserService'; 
import { isThereUserInterestRelation,  addInterestToUser, deleteInterestFromUser } from '../../Services/InterestService';

function Interest(props) {	
	const [commentList, setCommentList] = useState([]);		
	const updateComment =  (newComment) => {				
		setCommentList(commentList.concat(newComment))		
	}

	const [ interestAddedToCurrentUser, setInterestAddedToCurrentUser ] = useState(false);

	const [currentUser, setCurrentUser] = useState({
    isLoggedIn: false,
  });

	function handleAddClick(e) {
		addInterestToUser(currentUser.id, props.interest._id);
		window.location.reload();
	}

	function handleDeleteClick(e) {
		deleteInterestFromUser(currentUser.id, props.interest._id);
		window.location.reload();
	}

  async function setUser() {
    const user = await getCurrentUser();
    await setCurrentUser(user);		
		await setInterestAddedToCurrentUser(user.isLoggedIn && (await isThereUserInterestRelation(user.id, props.interest._id)));				
  }

	useEffect(() => {										
		setUser();
		axios.get('http://localhost:5000/comments/getComments/' + props.interest._id)
			.then(response => {setCommentList(response.data)})
			.catch((error) => console.log(error));
	}, [])

	return (				
		<div className='ps-4'>
			<div className="ps-4 pe-4 d-flex pt-4">
				<div className='w-30'>
					<div className="w-100 d-flex justify-content-center">
						<img height={420} className="" width={"100%"} src={`/img/${props.interest.image}`} onError={(e)=>{e.target.onerror = null; e.target.src="/	"}} alt=""/>
					</div>

					<div className='w-100 d-flex justify-content-center mt-2'>
						{interestAddedToCurrentUser || <button type="button" className="w-85 btn btn-outline-success" onClick={handleAddClick}>Add to collection</button>}
						{interestAddedToCurrentUser && <button type="button" className="w-85 btn btn-outline-danger" onClick={handleDeleteClick}>Remove from collection</button>}
					</div>
					
				</div>

				<div className="ms-4 border border-1 rounded border-dark ps-4 pe-4 w-50 bg-light pb-4">
					<h1 className="mt-4">{props.interest.name}</h1>
					<h5>Author: {props.interest.author}</h5>					
					<h3>About {props.interest.type}</h3>
					<span className='break'> {props.interest.description}</span>
				</div>
			</div>
		<div className='mt-4'>
			<CommentSection CommentList = {commentList.reverse()} insterestId={props.interest._id} refreshFunction = {updateComment}/>
		</div>
		</div>
	);
}

export default Interest;