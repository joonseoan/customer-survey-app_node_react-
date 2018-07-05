const mongoose = require('mongoose');
const { Schema } = mongoose;

// It is a pure schema. Not a model.
const recipientSchema = require('./recipients');

const surveySchema = new Schema({

	title: String,
	body: String,
	subject: String,

	// 1)
	// **** It is a way to define types inside of String
	//recipients: [String],
	// *******The array containing the Schema object is from "./recipients"
	// It consists of property values returned from mongoose Schema.
	
	/*
	recipients : [
		
		// instances to "
			
			new Schema({

				email : String,
				responded : {

					type: Boolean,
					default: false
				
				}
		
			"

	]
	*/
	// Therefore, the elements of this array are
	//		 return values of Schema object
	// Can Schema return value of Schema???
	recipients : [ recipientSchema ],

	// It is a way of model
	yes : { type : Number, default : 0 },
	no : { type : Number, default : 0 },
	_user : {

		type : Schema.Types.ObjectId,

		// ***Refers to "User" ObjectId!!!!
		ref : 'User'
	},
	
	dateSent : Date,
	dateResponded : Date

});

// insert survySchema with property name of ['surveys'] into a "model" property.
mongoose.model('surveys', surveySchema);

