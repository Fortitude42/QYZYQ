import axios from "axios";

async function findInterestById(id) {    
	const res = await fetch("http://localhost:5000/interests/getById/" + id);
	return await res.json() ;        
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
	console.log("http://localhost:5000/userInterestRelations/deleteByUserIdAndByInterestId/" + userId + '/' + interestId);
}

export { findInterestById, findInterestsByUserId, isThereUserInterestRelation, addInterestToUser, deleteInterestFromUser };