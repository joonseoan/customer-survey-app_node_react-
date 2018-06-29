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

	app.get('/api/surveys', requireLogin, async (req, res) => {

		console.log('wori?????????????????????????/')

		const surveys = await Survey.find( { _user : req.user.id })

			/* 

				// include a and b, exclude other fields
				query.select('a b');

				// exclude c and d, include other fields
				query.select('-c -d');

				// or you may use object notation, useful when
				// you have keys already prefixed with a "-"
				query.select({ a: 1, b: 1 });
				query.select({ c: 0, d: 0 });

				// force inclusion of field excluded at schema level
				query.select('+path')
			
			*/
			// instead of 0, juse use false.
				.select({ recipients : false });

		res.send(surveys);

	});

	//Thank you for survey
	app.get('/api/surveys/:surveyId/:choice', (req, res) => {

		res.send('Thank you for your voting!');

	});

	// For sengrid's feedback when the surveyees click yes or no
	//	It access to the server based on POST (sengrid server -> customer survey server)
	// We can get surveyee's response about the survey.
	app.post('/api/surveys/webhooks', (req, res) => {

		console.log('webhook req.body: ', req.body);
		// res.send({});

		// 1)
		// req.body send some contents over req.body.
		// When array has an element. It looks like parsing object.
		// const events = _.map(req.body, event => {

		// 	// "URL.pathname": basic property of URL object
		// 	const pathname = new URL(event.url).pathname
			
		// 	// It prints route without domain name
		// 	//  => /api/surveys/5b34252259328645746906a6/yes
		// 	// console.log('pathname: ', pathname); 

		// 	// making two wild cards
		// 	const p = new Path('/api/surveys/:surveyId/:choice');
			
		// 	// p.test can return null/false
		// 	// need to verify true using if like down below.
		// 	// Also, we can't use destructuring because it can be null.
		// 	const match = p.test(pathname);

		// 	// wildcard name : surveyId, choice, wildcard values: collection _id and yes or no
		// 	//  p.test(pathname):  { surveyId: '5b34252259328645746906a6', choice: 'yes' }
		// 	// console.log('p.test(pathname): ', p.test(pathname));

		// 	// event object has an email property.
		// 	if(match) return { email : event.email, surveyId : match.surveyId, choice : match.choice };

		// });
		
		// //  return value above
		// /* 
		// 	events:  [ { email: 'joonseo74@gmail.com',
		// 	[0]     surveyId: '5b343fad581e883a9ccba92e',
		// 	[0]     choice: 'yes' } ]

		// */
		// console.log('events: ', events);

		// const noUndefinedValue = _.compact(events);

		// // In the object of an array, filter out the duplicated value
		// const uniqueValueOnly = _.uniqBy(noUndefinedValue, 'email', 'surveyId');

		// console.log('uniqueValueOnly: ', uniqueValueOnly);

		// 2)
		// By using lodash chain!!!! which is working 
		//		on the basis of array value.
		_.chain(req.body)
			// console.log('', req.body)
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

					// find
					// surveyId is returned value of "uniqBy"
					
					// mongoose: id and _id, both ark ok.
					// However, at mongoDB, we need to explitly specify "_"id
					_id: surveyId,
					recipients: {

						// mongoDB operator, $elementMatch that walks through all properties
						//	and find the identified fields with the returned email values
						//	and responded:false
						$elemMatch: { email, responded: false }
					
					}

				}, {

					// update [choice] : yes || no, which is returned value.
					// increase 1++
					$inc: { [ choice ]: 1 },

					// set property, "resonded" inside of $elementMatch 
					//	of inside of recipients to be true 
					$set: {'recipients.$.responded': true },

					// update time also
					lastResponded: new Date()

				}).exec() // to execute query. We must specify this.

			})
			.value(); // It must exist at the end of chaining.

		// everything is ok.
		res.send({});

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