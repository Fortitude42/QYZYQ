const router = require('express').Router();
let Comment = require('../models/comment.model');

router.route('/').get((req, res) => {
	Comment.find()
		.then(comments => res.json(comments))
		.catch(err => res.status(400).json('Error: ' + err));		
})


router.route('/postComment').post(async (req, res) => {
	const newComment = new Comment(req.body);	
	newComment.save()
		.then(() => res.json('Comment added'))
		.catch(err => res.status(400).json('Error: ' + err));
})

router.route("/getComments/:interestId").get((req, res) => {		
	Comment.find({ "insterestId": req.params.interestId})
		.then(comments => res.json(comments))
		.catch(err => res.status(400).json('Error: ' + err));		
});

module.exports = router;