// just centraliz login verification by making m/w

// same argument req, res, next
module.exports = (req, res, next) => {

	if(!req.user) {

		res.status(401).send({error : "You must log in first!"});

	}

	next();

};
