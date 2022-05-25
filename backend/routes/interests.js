const router = require('express').Router();
const {v4: uuidv4 } = require('uuid');
const multer = require('multer');

let path = require('path');
let Interest = require('../models/interest.model');

const storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, '../public/img');
	},
	filename(req, file, cb) {
		cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
	}
})

const fileFilter = (req, file, cb) => {
	const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
	if(allowedFileTypes.includes(file.mimetype)) {
			cb(null, true);
	} else {
			cb(null, false);
	}
}

let upload = multer({ storage, fileFilter });


router.route('/').get((req, res) => {
	Interest.find()
		.then(interests => res.json(interests))
		.catch(err => res.status(400).json('Error: ' + err));
})

router.route('/getById/:id').get((req, res) => {
	Interest.findById(req.params.id)
		.then(interest => res.json(interest))
		.catch(err => res.status(400).json('Error: ' + err));
}) 

router.route('/add').post(upload.single('image'), (req, res) => {		
	const newInterest = new Interest({
		name: req.body.name,
		author: req.body.author,
		type: req.body.type,
		description: req.body.description,
		image: req.hasOwnProperty('file') ? req.file.filename : null
	});

	newInterest.save()
		.then(() => res.json('Interest added'))
		.catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;