const mongoose = require('mongoose');
const { Schema } = mongoose;

const recipientSchema = new Schema({

	email : String,
	responded : {

		type: Boolean,
		default: false

	}

});

// without model to be placed in the field of survey
module.exports = recipientSchema;


