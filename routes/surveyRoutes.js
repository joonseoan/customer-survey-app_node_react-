const _ = require('lodash');
const Path = require('path-parser');
const { URL } = require('url');

const mongoose = require('mongoose');

const requireLogin = require('../middleware/requireLogin');
const requireCredits = require('../middleware/requireCredits');

const Mailer = require('../services/Mailer');

const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = app => {

	app.get('/api/surveys', requireLogin, async (req, res) => {

		const surveys = await Survey.find( { _user : req.user.id })

			// instead of 0, juse use false.
				.select({ recipients : false });

		res.send(surveys);

	});

	//Thank you for survey
	app.get('/api/surveys/:surveyId/:choice', (req, res) => {

		res.send('Thank you for your voting!');

	});

	app.post('/api/surveys/webhooks', (req, res) => {

		console.log('url: ', req.body.url);

		_.chain(req.body)
		
			.map((({ url, email }) => {

				const { pathname } = new URL(url);

				// Must identify with pathname aboave
				const p = new Path('/api/surveys/:surveyId/:choice');

				const match = p.test(pathname);

				if(match) return { email : email, surveyId : match.surveyId, choice : match.choice };

			}))
			.compact()
			.uniqBy('email', 'surveyId')
			.each(({ surveyId, email, choice }) => {

				// updateOne is to find collection at first{} and update it at second {}!!!!
				Survey.updateOne({

					_id: surveyId,
					recipients: {

						$elemMatch: { email, responded: false }
					
					}

				}, {

					$inc: { [ choice ]: 1 },
					$set: {'recipients.$.responded': true },
					// update time also
					lastResponded: new Date()

				}).exec() // to execute query. We must specify this.

			})
			.value(); // It must exist at the end of chaining.

		res.send({});

	});

	app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {

		const { title, subject, body, recipients } = req.body;

		// creating a memory space for the object or collection
		// 		by building instance to create and access to the properties
		const survey = new Survey ({

			title,
			subject,
			body,
			recipients : recipients.split(',').map(email => ({ email : email.trim() })),

			// assins "req.user.id" in req header
			_user : req.user.id,
			dateSent : Date.now()

		});

		const mailer = new Mailer(survey, surveyTemplate(survey));
	
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

			res.status(422).send(err);
		
		}
		
	});

};