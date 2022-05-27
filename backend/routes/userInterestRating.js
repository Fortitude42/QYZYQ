const router = require('express').Router();
let UserInterestRating = require('../models/userInterestRating.model');

router.route('/').get((req, res) => {
	UserInterestRating.find()
		.then(uirs => res.json(uirs))
		.catch(err => res.status(400).json('Error: ' + err));		
})


router.route('/add').post(async (req, res) => {
	const newUIR = new UserInterestRating(req.body);	
	newUIR.save()
		.then(() => res.json('Added new User-Interest Rating!'))
		.catch(err => res.status(400).json('Error: ' + err));
})

router.route('/deleteByUserIdAndByInterestId/:userId/:interestId').delete((req, res) => {
	UserInterestRating.deleteMany({$and: [{"interestId": {$eq: req.params.interestId}, "userId": {$eq: req.params.userId}}] })
	.then(() => res.json('User-Interest Rating deleted!'))
	.catch(err => res.status(400).json('Error: ' + err));
})

router.route("/getByUserId/:userId").get((req, res) => {		
	UserInterestRating.find({ "userId": req.params.userId})
		.then(uirs => res.json(uirs))
		.catch(err => res.status(400).json('Error: ' + err));		
});

router.route("/getByInterestId/:interestId").get((req, res) => {		
	UserInterestRating.find({ "interestId": req.params.interestId})
		.then(uirs => res.json(uirs))
		.catch(err => res.status(400).json('Error: ' + err));		
});

router.route("/getByUserIdAndByInterestId/:userId/:interestId").get((req, res) => {			
	UserInterestRating.find({$and: [{"interestId": {$eq: req.params.interestId}, "userId": {$eq: req.params.userId}}] })
		.then(uirs => res.json(uirs))		
		.catch(err => res.status(400).json('Error: ' + err));		
});

router.route("/updateScoreByUserIdAndByInterestId/:userId/:interestId").post((req, res) => {
	UserInterestRating.findOne({$and: [{"interestId": {$eq: req.params.interestId}, "userId": {$eq: req.params.userId}}]})
		.then(uir => {
			uir.score = req.body.score;

			uir.save()
				.then(() => res.json("User-Interest Rating Score Updated!"))
				.catch(err => res.status(400).json("Error " + err));
		})
})

module.exports = router;