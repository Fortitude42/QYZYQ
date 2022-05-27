const router = require('express').Router();
let User = require('../models/user.model');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {v4: uuidv4 } = require('uuid');
const multer = require('multer');

let path = require('path');


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
	User.find()
		.then(users => res.json(users))
		.catch(err => res.status(400).json('Error: ' + err));
})

router.route('/getById/:id').get((req, res) =>{
		User.findById(req.params.id)
			.then(user => res.json(user))
			.catch(err => res.status(400).json('Error: ' + err));
})


router.route('/register').post(async (req, res) => {
	const newUser = new User(req.body);	
	newUser.password = await bcrypt.hash(req.body.password, 10);
	newUser.save()
		.then(() => res.json('User added'))
		.catch(err => res.status(400).json('Error: ' + err));
})

router.route('/update/:id').post(upload.single('picture'), (req, res) => {
	User.findById(req.params.id)
		.then(user => {
			user.firstName = req.body.firstName;
			user.lastName = req.body.lastName;
			user.email = req.body.email;
			user.picture = req.hasOwnProperty('file') ? req.file.filename : null;

			user.save()
				.then(() => res.json("User updated!"))
				.catch(err => res.status(400).json("Error " + err));

		}).catch(err => res.status(400).json("Error " + err))
})

const secondsInDay = 86400;
const secretWord = "rarewoirewhrioewrqoiheqwoirhieworhqower"

router.route('/login').post((req, res) => { 
	const currentUser = req.body;
	
	User.findOne({email: currentUser.email})
		.then(userFromDB => {

			if(!userFromDB)
				return res.json('Invalid email or password')
			

			bcrypt.compare(currentUser.password, userFromDB.password).then(isCorrect => {
				if (isCorrect) {
					const payload = {
						id: userFromDB._id,
						firstName: userFromDB.firstName,
						lastName: userFromDB.lastName,
						picture: userFromDB.picture,
					};

					jwt.sign(payload, secretWord, {expiresIn: secondsInDay}, (err, token) => {						 
						return err ? res.status(400).json('Error: ' + err) : res.json({message: "Success",token: "Bearer " + token})
					});
				} else 
					return res.json('Invalid email or password');				
			})
		})
})

function verifyJWT(req, res, next) {
	const token = req.headers["x-access-token"]?.split(' ')[1]
	if (token) {
		jwt.verify(token, secretWord, (err, decoded) => {
			if (err)
				return res.json({isLoggedIn: false, message: "Failed To Authenticate"});

			req.user = {
				id: decoded.id,
				firstName: decoded.firstName,
				lastName: decoded.lastName,
				picture: decoded.picture,
			};
			
			next();
		})
	} else {
		res.json({message: "Incorrect Token Given", isLoggedIn: false});
	}
}

router.get("/isUserAuth", verifyJWT, (req, res) => {	
	return res.json({
		isLoggedIn: true, 
		id: req.user.id,
		firstName: req.user.firstName, 
		lastName: req.user.lastName,
		picture: req.user.picture,
	})
})

module.exports = router;