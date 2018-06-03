const mongoose = require('mongoose');
const { Schema } = mongoose;
const recipientSchema = require('./recipients');
console.log('[recipientSchema]: ', recipientSchema)

const surveySchema = new Schema({

	title: String,
	body: String,
	subject: String,

	// 1)
	// **** It is a way to define types inside of String
	//recipients: [String],
	// *******The array containing the object of Schema from "./recipients"
	// it consists of property values returned from mongoose Schema.
	recipients : [ recipientSchema ],

	// It is a way of model
	yes : { type : Number, default : 0 },
	no : { type : Number, default : 0 },
	_user : {

		// ObjectID type setup.
		// Be careful!!! about spelling "ObjectId"
		type : Schema.Types.ObjectId,

		// ***Refers to "User" ObjectId!!!!
		ref : 'User'
	},
	dateSent : Date,
	dateResponded : Date

});

mongoose.model('surveys', surveySchema);
