const mongoose = require('mongoose');

const requireLogin = require('../middleware/requireLogin');
const requireCredits = require('../middleware/requireCredits');

// Use "Mailer" class to deliver value
const Mailer = require('../services/Mailer');

// To render the contents
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

// Survey = pull a parameter, 'surveys' model function out of mongoose
// Then, call the model property defined and stored in mongoose 
//		which is defined in "survey.js".
// Also, then make an instance
// Bear in mind that the modle here is stored in mongoose
//		therefore, we can get the collection and schema 
//		directly from "mongoose"  
const Survey = mongoose.model('surveys');

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

			// need to verify "recipients.split(',')""
			recipients : recipients.split(',').map(email => ({ email : email.trim() })),
			// assins "req.user.id" in req header
			_user : req.user.id,
			dateSent : Date.now()

		});

		// Great Place
		// 'survey' = property values that get into database from the user
		// 'surveyTemplate' = return value of surveyTemplate(survey) 
		//		that stands for a body field from the user
		const mailer = new Mailer(survey, surveyTemplate(survey));

	});

};