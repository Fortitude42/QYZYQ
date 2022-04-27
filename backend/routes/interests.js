const router = require('express').Router();
let Interest = require('../models/interest.model');

router.route('/').get((req, res) => {
	Interest.find()
		.then(interests => res.json(interests))
		.catch(err => res.status(400).json('Error: ' + err));
})


router.route('/add').post((req, res) => {
	const newInterest = new Interest(req.body);

	newInterest.save()
		.then(() => res.json('Interest added'))
		.catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;