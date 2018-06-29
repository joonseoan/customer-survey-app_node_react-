const sendgrid = require('sendgrid');

// get sendgrid object's mail property.
const helper = sendgrid.mail;

const keys = require ('../config/keys');

// mail.Mail property..
// console.log('mail.Mail', helper.Mail);
// To make properties for mapping Sendgrid's library as followed.
// To JSON below is to make the class literal object and then JSON format
/* 

var helper = require('sendgrid').mail;
var fromEmail = new helper.Email('test@example.com');
var toEmail = new helper.Email('test@example.com');
var subject = 'Sending with SendGrid is Fun';
var content = new helper.Content('text/plain', 'and easy to do anywhere, even with Node.js');
var mail = new helper.Mail(fromEmail, subject, toEmail, content);
 
var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
var request = sg.emptyRequest({
  method: 'POST',
  path: '/v3/mail/send',
  body: mail.toJSON()
});
 
sg.API(request, function (error, response) {
  if (error) {
    console.log('Error response received');
  }
  console.log(response.statusCode);
  console.log(response.body);
  console.log(response.headers);
});
*/
class Mailer extends helper.Mail {

	// ************{ subject, recipients } : deconstructor of "survey" object.
	//		which has the value from the user.
	// "contents" return value of "surveyTemplate(survey)"" 
	// constructor(survey, content) {		
	constructor({ subject, recipients }, content) {

		super();

		// send key to sendGrid and then get communication with sendgrid. 
		this.sgApi = sendgrid(keys.sendGridKey); 

		// Therefore, "Email" lib, a property of helper(sendgrid.mail)
		//		 is a function constructor
		this.from_email = new helper.Email('no-reply@customer_survey.com');	
		
		this.subject = subject;
	
		// "contents" is a html format
		this.body = new helper.Content('text/html', content);
		this.recipients = this.formatAddresses(recipients);
		this.addClickTracking();

		// addContent is a built-in function of helper.Email().
		// For the class or object that inherits its functions or properties
		//		"this" must be also.************************ 
		this.addContent(this.body);

		this.addRecipients();

		// console.log('helper.Mail: ^^^^^^^^^', heper.Mail);

	}

	// recipients = "recipients" parameter in constructor
	formatAddresses(recipients)	{

		// ({ email }) is deconstructor of recipients, { email, responded } in
		//	 	an array.
		// Keep in mind that when deconstructing in parameters,
		//		*****************it must have ()!!!!!
		// recipients : recipients.split(',').map(email => ({ email : email.trim() }))
		//		it returns objects containing email. So we can deconstruct to pull out
		//		property.
		return recipients.map(({ email }) => {

			// store the surveyees's email.
			return new helper.Email(email); // returns an array!!!

		});

	}	

	addClickTracking() {

		// all down below are from sendgrid's built in libs 
		const trackingSettings = new helper.TrackingSettings();
		const clickTracking = new helper.ClickTracking(true, true); //helper.ClickTracking

		trackingSettings.setClickTracking(clickTracking);
		this.addTrackingSettings(trackingSettings);	
	
	}

	addRecipients() {

		const personalize = new helper.Personalization();

		// why not map?? => because of no return
		this.recipients.forEach(recipient => {

			console.log('recipient', recipient);

		   // addTo() is a function of "new helper.Personalization()" from sendgrid
			personalize.addTo(recipient);
			
		});

		// addPersonalization() from sendgrid
		this.addPersonalization(personalize);
		
	}

	async send() {

		const request = this.sgApi.emptyRequest({

			method: 'POST',
			path : '/v3/mail/send',
			body: this.toJSON()
			//console.log(this);
		
		});

		/*
		    [request]
			request of Sendgrid:  { host: '',
			[0]   method: 'POST',
			[0]   path: '/v3/mail/send',
			[0]   headers: {},
			[0]   body:
			[0]    { from: { email: 'no-reply@customer_survey.com' },
			[0]      personalizations: [ [Object] ],
			[0]      subject: 'sendgrid response and request',
			[0]      content: [ [Object] ],
			[0]      tracking_settings: { click_tracking: [Object] } },
			[0]   queryParams: {},
			[0]   test: false,
			[0]   port: '' }
		*/
		// console.log('request of Sendgrid: ', request);

		const response = await this.sgApi.API(request);
		
		/* 

			 response of Sendgrid:  { statusCode: 202,
			[0]   body: '',
			[0]   headers:
			[0]    { server: 'nginx',
			[0]      date: 'Thu, 28 Jun 2018 15:09:33 GMT',
			[0]      'content-type': 'text/plain; charset=utf-8',
			[0]      'content-length': '0',
			[0]      connection: 'close',
			[0]      'x-message-id': 'sYuO7eEIQCS71h9mx59Hzg',
			[0]      'access-control-allow-origin': 'https://sendgrid.api-docs.io',
			[0]      'access-control-allow-methods': 'POST',
			[0]      'access-control-allow-headers': 'Authorization, Content-Type, On-behalf-of, x-sg-elas-acl',
			[0]      'access-control-max-age': '600',
			[0]      'x-no-cors-reason': 'https://sendgrid.com/docs/Classroom/Basics/API/cors.html' } }
			[2] events.js:167
		
		*/
		
		// console.log('response of Sendgrid: ', response);
		// Express receives this value.
		return response; 

	}

}

module.exports = Mailer;