const router = require('express').Router();
let User = require('../models/user.model');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

router.route('/').get((req, res) => {
	User.find()
		.then(users => res.json(users))
		.catch(err => res.status(400).json('Error: ' + err));		
})


router.route('/register').post(async (req, res) => {
	const newUser = new User(req.body);	
	newUser.password = await bcrypt.hash(req.body.password, 10);
	newUser.save()
		.then(() => res.json('User added'))
		.catch(err => res.status(400).json('Error: ' + err));
})

const secondsInDay = 86400;
const secretWord = "rarewoirewhrioewrqoiheqwoirhieworhqower"

router.route('/login').post((req, res) => { 
	const userLoggingIn = req.body;
	User.findOne({email: userLoggingIn.email})
		.then(dbUser => {
			if(!dbUser){
				return res.json('Invalid email or password')
			}
			bcrypt.compare(userLoggingIn.password, dbUser.password)			
			.then(isCorrect => {
				if(isCorrect){
					const payload = {
						id: dbUser._id,
						firstName: dbUser.firstName,
						lastName: dbUser.lastName
					};
					jwt.sign(
						payload,
						secretWord,
						{expiresIn: secondsInDay}, 
						(err, token) => {
							if(err) return res.status(400).json('Error: ' + err);
							return res.json({
								message: "Success",
								token: "Bearer " + token,
							});
						}
					);
				}else{
					return res.json('Invalid email or password');
				}
			})
		})
})

function verifyJWT(req, res, next) {
    const token = req.headers["x-access-token"]?.split(' ')[1]
    if (token) {
        jwt.verify(token, secretWord, (err, decoded) => {
            if (err) return res.json({isLoggedIn: false, message: "Failed To Authenticate"});
            req.user = {};
			console.log(decoded.firstName);
			console.log(decoded.lastName);
            req.user.id = decoded.id;
			req.user.firstName = decoded.firstName;
			req.user.lastName = decoded.lastName;
            next();
        })
    } else {
        res.json({message: "Incorrect Token Given", isLoggedIn: false});
    }
}

router.get("/isUserAuth", verifyJWT, (req, res) => {
	console.log(req.user.firstName);
	console.log('ewq');
	console.log(req.user.lastName);
    return res.json({isLoggedIn: true, firstName: req.user.firstName, lastName: req.user.lastName})
})

module.exports = router;