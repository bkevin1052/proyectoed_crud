'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

constchatSchema = mongoose.Schema({ 

	emisor :  String,
	receptor	: String, 
	listaMensajes	: Array,
});

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/duckchat');

module.exports = mongoose.model('chat', userSchema); 