const mongoose = require('mongoose');

const requireLogin = require('../middleware/requireLogin');
const requireCredits = require('../middleware/requireCredits');

// Survey = insert a parameter, 'surveys' model function of mongoose
// Then, call the model property defined and stored in mongoose 
//		which is defined in "survey.js".
// Also, then make an instance
// Bear in mind that the modle here is stored in mongoose
//		therefore, we can get the collection and schema 
//		directly from "mongoose"  
const Survey = mongoose.model('survyes');

module.exports = app => {

	// we can add middleware in order required in the app flow
	app.post('api/surveys', requireLogin, requireCredits, (req, res) => {

		// new properties are created inside "req.body" by the user who posts the data
		const { title, subject, body, recipients } = req.body;

		// creating a memory space for the object or collection
		// 		by building instance to create and access to the properties

		const survey = new Survey ({

			title,
			subject,
			body,
			//({email}) => () is like return(); for javascript engine to clearify it
			recipients : recipients.split(',').map(email => ({ email : email.trim() }),
			// assins "req.user.id" in req header
			_user : req.user.id,
			dateSent : Date.now()

		});


	});

};