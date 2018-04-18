const mongoose = require('mongoose');

// const Schema = mongoose.Schema;
// I should notice Schema Vs. model
const { Schema } = mongoose;

const userSchema = new Schema ({

    googleID : String

});

// "users" : collection name we want to create.
// "userSchema" : document's field type we want to create.
mongoose.model('users', userSchema);