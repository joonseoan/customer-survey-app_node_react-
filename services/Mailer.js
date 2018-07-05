const sendgrid = require('sendgrid');

// get sendgrid object's mail property.
const helper = sendgrid.mail;

const keys = require ('../config/keys');

class Mailer extends helper.Mail {

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
		
		// addContent is a built-in function of helper.Email().
		// For the class or object that inherits its functions or properties
		this.addContent(this.body);
		this.addClickTracking();
		this.addRecipients();

	}

	// recipients = "recipients" parameter in constructor
	formatAddresses(recipients)	{

		return recipients.map(({ email }) => {

			// store the surveyees's email.
			return new helper.Email(email); // returns an array!!!

		});

	}	

	addClickTracking() {

		const trackingSettings = new helper.TrackingSettings();
		const clickTracking = new helper.ClickTracking(true, true); //helper.ClickTracking

		trackingSettings.setClickTracking(clickTracking);
		this.addTrackingSettings(trackingSettings);	
	
	}

	addRecipients() {

		const personalize = new helper.Personalization();

		this.recipients.forEach(recipient => {

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
		
		});

		const response = await this.sgApi.API(request);
				
		// console.log('response of Sendgrid: ', response);
		// Express receives this value.
		return response; 

	}

}

module.exports = Mailer;