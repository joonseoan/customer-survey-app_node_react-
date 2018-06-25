const sendgrid = require('sendgrid');

// get sendgrid object's mail property.
const helper = sendgrid.mail;

const keys = require ('../config/keys');

// mail.Mail property..
// console.log('mail.Mail', helper.Mail);

class Mailer extends helper.Mail {

	// ************{ subject, recipients } : deconstructor of "survey" object.
	//		which has the value from the user.
	// "contents" return value of "surveyTemplate(survey)"" 
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

		// why not map??
		this.recipients.forEach(recipient => {

			console.log('recipient', recipient);

		   // addTo() is a function of "new helper.Personalization()" from sendgrid
			personalize.addTo(recipient);
			
		});

		// addPersonalization() from sendgrid
		this.addPersonalization(personalize);
		
	}

	async send() {

		const request = await this.sgApi.emptyRequest({

			method: 'POST',
			path : '/v3/mail/send',
			body: this.toJSON()
			//console.log(this);
		
		});

		const response = await this.sgApi.API(request);
		
		return response; 

	}

}

module.exports = Mailer;