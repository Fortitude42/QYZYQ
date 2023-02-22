import axios from "axios";

async function findInterestById(id) {    
	const res = await fetch("http://localhost:5000/interests/getById/" + id);
	return await res.json() ;
}


async function findCommentsByInterestId(interestId) {
	const comments = await axios.get('http://localhost:5000/comments/getComments/' + interestId)
			.then(response => response.data)
			.catch((error) => console.log(error));
	return comments;
}

async function findInterestsByUserId(userId) {
  const uirs = await axios.get("http://localhost:5000/userInterestRelations/getByUserId/" + userId)
		.then(response => response.data)		
		.catch((error) => console.log(error));
	
	const interests = [];
	for (let uir of uirs)
		interests.push(await findInterestById(uir.interestId));
		
	
	return interests;
}

async function isThereUserInterestRelation(userId, interestId) {
	const uirs = await axios.get("http://localhost:5000/userInterestRelations/getByUserIdAndByInterestId/" + userId + '/' + interestId)
	.then(response => response.data)
	.catch((error) => console.log(error));			
	return uirs.length > 0;
}

async function addInterestToUser(userId, interestId) {
	axios.post("http://localhost:5000/userInterestRelations/add/", {
		"userId": userId,
		"interestId": interestId,
	})
}

async function deleteInterestFromUser(userId, interestId) {
	axios.delete("http://localhost:5000/userInterestRelations/deleteByUserIdAndByInterestId/" + userId + '/' + interestId);	
}


async function getScoresByInterestId(interestId) {
	const uirs = await axios.get("http://localhost:5000/userInterestRatings/getByInterestId/" + interestId)
		.then(response => response.data)		
		.catch((error) => console.log(error));

	return {
		reviewCount: uirs.length,
		scoreSum: uirs.reduce((sum, current) => sum + current.score, 0),
	}
}

async function getScoreByUserIdAndByInterestId(userId, interestId) {
	const uirs = await axios.get("http://localhost:5000/userInterestRatings/getByUserIdAndByInterestId/" + userId + '/' + interestId)
		.then(response => response.data)
		.catch((error) => console.log(error));			

	if (uirs.length === 0)
		return null;

	return uirs[0].score;
}

async function addUserInterestRating(userId, interestId, score) {
	axios.post("http://localhost:5000/userInterestRatings/add/", {
		"userId": userId,
		"interestId": interestId,
		"score": score,
	})
}

async function updateScoreByUserIdAndByInterestId(userId, interestId, score) {
	axios.post("http://localhost:5000/userInterestRatings/updateScoreByUserIdAndByInterestId/" + userId + '/' + interestId, {		
		"score": score,
	})
}

async function deleteUserInterestRating(userId, interestId) {
	axios.delete("http://localhost:5000/userInterestRatings/deleteByUserIdAndByInterestId/" + userId + '/' + interestId);	
}

async function findInterestsByAuthor(author){
	const res = await fetch("http://localhost:5000/interests/getByAuthor/" + encodeURI(author));
	return await res.json() ;
}

export { findCommentsByInterestId, findInterestsByAuthor,
	findInterestById, findInterestsByUserId, isThereUserInterestRelation, addInterestToUser, deleteInterestFromUser,
	getScoresByInterestId, getScoreByUserIdAndByInterestId, addUserInterestRating, updateScoreByUserIdAndByInterestId, deleteUserInterestRating };