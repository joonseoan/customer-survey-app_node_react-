const _ = require('lodash');
const Path = require('path-parser');
const { URL } = require('url');

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

	//Thank you for survey
	// app.get('/api/surveys/thankyou', (req, res) => {

	// 	res.send('Thank you for your voting');

	// });

	// for sengrid feedback when the surveyees click yes or no
	// We can get surveyee's response about the survey.
	app.post('/api/surveys/webhooks', (req, res) => {

		console.log('webhook req.body: ', req.body);
		// res.send({});

		// req.body send some contents over req.body.
		// When array has an element. It looks like parsing object.
		const events = _.map(req.body, event => {

			// "URL.pathname": basic property of URL object
			const pathname = new URL(event.url).pathname
			
			// It prints route without domain name
			//  => /api/surveys/5b34252259328645746906a6/yes
			console.log('pathname: ', pathname); 

			// making two wild cards
			const p = new Path('/api/surveys/:surveyId/:choice');
			
			// p.test can return null/false
			// need to verify true using if like down below.
			// Also, we can't use destructuring because it can be null.
			const match = p.test(pathname);

			// wildcard name : surveyId, choice, wildcard values: collection _id and yes or no
			//  p.test(pathname):  { surveyId: '5b34252259328645746906a6', choice: 'yes' }
			console.log('p.test(pathname): ', p.test(pathname));

			// event object has an email property.
			if(match) return { email : event.email, surveyId : match.surveyId, choice : match.choice };

		});

		console.log('events: ', events);

	});


	// we can add middleware in order required in the app flow
	app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {

		// new properties are created inside "req.body" by the user who posts the data
		const { title, subject, body, recipients } = req.body;

		// creating a memory space for the object or collection
		// 		by building instance to create and access to the properties
		const survey = new Survey ({

			title,
			subject,
			body,

			//({email}) => () is like return(); for javascript engine to clearify it
			// need to verify "recipients.split(',')"" => string => array based on ","
			// Still no response is defined yet.!!!! Don't be confused.
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
	
		// Asyncronous will have troubles
		try {

			// get "send()" method in Mailer class.
			await mailer.send();
			
			// survey is stored in database
			await survey.save();

			// When the email is successfully done, it substract 1.
			req.user.credits -= 1;

			const user = await req.user.save(); 

			res.send(user);
	
		} catch (err) {

			// 422: something wrong transferring or manipulating data
			res.status(422).send(err);
		
		}
		
	});

};