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
//  to be exported and placed in another schema.
// console.log('recipientSchema: ', recipientSchema);
/* 
 Schema {
[0]   obj:
[0]    { email: [Function: String],
[0]      responded: { type: [Function: Boolean], default: false } },
[0]   paths:
[0]    { email:
[0]       SchemaString {
[0]         enumValues: [],
[0]         regExp: null,
[0]         path: 'email',
[0]         instance: 'String',
[0]         validators: [],
[0]         setters: [],
[0]         getters: [],
[0]         options: [Object],
[0]         _index: null },
[0]      responded:
[0]       SchemaBoolean {
[0]         path: 'responded',
[0]         instance: 'Boolean',
[0]         validators: [],
[0]         setters: [],
[0]         getters: [],
[0]         options: [Object],
[0]         _index: null,
[0]         defaultValue: false },
[0]      _id:
[0]       ObjectId {
[0]         path: '_id',
[0]         instance: 'ObjectID',
[0]         validators: [],
[0]         setters: [Array],
[0]         getters: [],
[0]         options: [Object],
[0]         _index: null,
[0]         defaultValue: [Function] } },
[0]   aliases: {},
[0]   subpaths: {},
[0]   virtuals: {},
[0]   singleNestedPaths: {},
[0]   nested: {},
[0]   inherits: {},
[0]   callQueue: [],
[0]   _indexes: [],
[0]   methods: {},
[0]   statics: {},
[0]   tree:
[0]    { email: [Function: String],
[0]      responded: { type: [Function: Boolean], default: false },
[0]      _id: { auto: true, type: [Function] } },
[0]   query: {},
[0]   childSchemas: [],
[0]   plugins: [],
[0]   s: { hooks: Kareem { _pres: {}, _posts: {} } },
[0]   _userProvidedOptions: {},
[0]   options:
[0]    { typeKey: 'type',
[0]      id: true,
[0]      noVirtualId: false,
[0]      _id: true,
[0]      noId: false,
[0]      validateBeforeSave: true,
[0]      read: null,
[0]      shardKey: null,
[0]      autoIndex: null,
[0]      minimize: true,
[0]      discriminatorKey: '__t',
[0]      versionKey: '__v',
[0]      capped: false,
[0]      bufferCommands: true,
[0]      strict: true } }
*/

module.exports = recipientSchema;


