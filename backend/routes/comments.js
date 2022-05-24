const router = require('express').Router();
let Comment = require('../models/commentary.model');

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

router.post("/getComments", (req, res) => {
    Comment.find({ "postId": req.body.postId })
        .populate('author')
        .exec((err, comments) => {
            if (err) return res.status(400).send(err)
            res.status(200).json({ success: true, comments })
        })

});

module.exports = router;