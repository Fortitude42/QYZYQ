import React, { useEffect, useState } from 'react';
import './Interest.css';
import CommentSection from '../../components/CommentSection/CommentSection';
import { getCurrentUser } from '../../Services/UserService'; 
import { useNavigate } from 'react-router-dom';
import { findCommentsByInterestId,
	 			isThereUserInterestRelation,  addInterestToUser, deleteInterestFromUser, 
				getScoresByInterestId, getScoreByUserIdAndByInterestId, deleteUserInterestRating, addUserInterestRating } from '../../Services/InterestService';

function Interest(props) {	
	const [commentList, setCommentList] = useState([]);		
	const updateComment =  (newComment) => {				
		setCommentList(commentList.concat(newComment))		
	}

	const [ interestAddedToCurrentUser, setInterestAddedToCurrentUser ] = useState(false);
	const [ interestRating, setInterestRating ] = useState({
		reviewCount: 0,
		scoreSum: 0,
	});

	const [isAddReviewClicked, setIsAddReviewClicked] = useState(false);

	const [currentUserScore, setCurrentUserScore] = useState(null);

	const [currentUser, setCurrentUser] = useState({
    isLoggedIn: false,
  });
	const navigate = useNavigate();


	function handleAddInterestClick(e) {
		if (!currentUser.isLoggedIn) {
			navigate('/login')
			return;
		}
		addInterestToUser(currentUser.id, props.interest._id);
		window.location.reload();
	}

	function handleDeleteInterestClick(e) {
		deleteInterestFromUser(currentUser.id, props.interest._id);
		window.location.reload();
	}

	function roundedRating(sum, count) {
		if (count === 0)
			return '-';		
		return (sum / count).toFixed(1);
	}

  async function setValues() {
    const user = await getCurrentUser();
    await setCurrentUser(user);		
		await setInterestAddedToCurrentUser(user.isLoggedIn && (await isThereUserInterestRelation(user.id, props.interest._id)));				
		await setInterestRating(await getScoresByInterestId(props.interest._id));		
		await setCurrentUserScore(await getScoreByUserIdAndByInterestId(user.id, props.interest._id));
		await setCommentList(await findCommentsByInterestId(props.interest._id));		
  }

	function handleNewReviewScoreClick(newReviewScore) { 
		if (!currentUser.isLoggedIn) {
			navigate('/login')
			return;
		}
		addUserInterestRating(currentUser.id, props.interest._id, newReviewScore);
		window.location.reload();
	}

	function isUserSure() {					
		return window.confirm('Do you really want to delete your review?');
	}	
	

	function handleDeleteReviewClick(event) {
		if (!isUserSure())
			return;
		deleteUserInterestRating(currentUser.id, props.interest._id);
		window.location.reload();
	}

	function getReviewSelectConent(){				
		const res = [];
		const minRate = 1, maxRate = 10;

		for (let i = minRate; i <= maxRate; ++i) {
			res.push(<div onClick={e => handleNewReviewScoreClick(i)} className='cursor-pointer w-10 review-hover text-dark text-center rounded'><span >{i}</span></div>);
		}
		
		return res;
	}

	useEffect(() => {										
		setValues();				
	}, [])

	return (				
		<div className='ps-4'>
			<div className="ps-4 pe-4 d-flex pt-4">
				<div className='w-30'>
					<div className="w-100 d-flex justify-content-center">
						<img height={420} className="" width={"100%"} src={`/img/${props.interest.image}`} onError={(e)=>{e.target.onerror = null; e.target.src="/	"}} alt=""/>
					</div>

					<div className='w-100 d-flex justify-content-center mt-2'>
						<div className='w-100'>							
							<div className='w-100 d-flex'>
								<div className='cursor-pointer'>
									<div className='h-75p ms-2 pt-1 ps-4 border border-1 border-secondary pe-4 pb-2 rounded mb-2 me-2 review review-hover'>
										<h5 className='w-100 text-dark'><strong className='text-danger'>{roundedRating(interestRating.scoreSum, interestRating.reviewCount)}</strong> / 10 </h5>
										<small className='text-secondary'>({interestRating.reviewCount} review{interestRating.reviewCount !== 1 && "s"})</small>
									</div>
								</div>

								{	currentUserScore != null &&
									<div className='cursor-pointer' onClick={handleDeleteReviewClick}>
										<div className='h-75p pt-1 ps-3 border border-1 border-secondary rounded mb-2 pe-3 review-hover'>
											<h6 className='text-secondary'>Your Review:</h6> 
											<h4><strong className='text-center text-danger ps-4'>{roundedRating(currentUserScore, 1)}</strong></h4>
										</div>
									</div>
								}

								{	currentUserScore == null  && !isAddReviewClicked &&
									<div className='cursor-pointer' onClick={e => setIsAddReviewClicked(true)}>
										<div className='h-75p pt-1 ps-3 pb-3 border border-1 border-secondary rounded mb-2 pe-3 review-hover'>
											<h6 className='text-dark'>Add Review</h6><br/>
										</div>
									</div>
								}																	
							</div>

							{isAddReviewClicked &&
								<div className='w-100 border border-1 border-dark rounded d-flex mb-2'>
									{getReviewSelectConent()}
								</div>
							}

							{interestAddedToCurrentUser || <button type="button" className="w-100 btn btn-outline-success" onClick={handleAddInterestClick}>Add to collection</button>}
							{interestAddedToCurrentUser && <button type="button" className="w-100 btn btn-outline-danger" onClick={handleDeleteInterestClick}>Remove from collection</button>}							
						</div>
					</div>
					
				</div>

				<div className="ms-4 border border-1 rounded border-dark ps-4 pe-4 w-50 bg-light pb-4">
					<h1 className="mt-4">{props.interest.name}</h1>
					<h5>By: {props.interest.author}</h5>						
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