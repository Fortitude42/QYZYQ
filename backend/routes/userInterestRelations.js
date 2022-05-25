const router = require('express').Router();
let UserInterestRelation = require('../models/userInterestRelation.model');

router.route('/').get((req, res) => {
	UserInterestRelation.find()
		.then(uirs => res.json(uirs))
		.catch(err => res.status(400).json('Error: ' + err));		
})


router.route('/add').post(async (req, res) => {
	const newUIR = new UserInterestRelation(req.body);	
	newUIR.save()
		.then(() => res.json('Added new User-Interest Relation!'))
		.catch(err => res.status(400).json('Error: ' + err));
})

router.route('/deleteByUserIdAndByInterestId/:userId/:interestId').delete((req, res) => {
	UserInterestRelation.deleteMany({$and: [{"interestId": {$eq: req.params.interestId}, "userId": {$eq: req.params.userId}}] })
	.then(() => res.json('User-Interest Relation deleted!'))
	.catch(err => res.status(400).json('Error: ' + err));
})

router.route("/getByUserId/:userId").get((req, res) => {		
	UserInterestRelation.find({ "userId": req.params.userId})
		.then(uirs => res.json(uirs))
		.catch(err => res.status(400).json('Error: ' + err));		
});

router.route("/getByInterestId/:interestId").get((req, res) => {		
	UserInterestRelation.find({ "interestId": req.params.interestId})
		.then(uirs => res.json(uirs))
		.catch(err => res.status(400).json('Error: ' + err));		
});

router.route("/getByUserIdAndByInterestId/:userId/:interestId").get((req, res) => {			
	UserInterestRelation.find({$and: [{"interestId": {$eq: req.params.interestId}, "userId": {$eq: req.params.userId}}] })
		.then(uirs => res.json(uirs))		
		.catch(err => res.status(400).json('Error: ' + err));		
});

module.exports = router;