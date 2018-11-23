'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const chatSchema = mongoose.Schema({ 
	contacto1 :  String,
	contacto2	: String, 
	llave: String,
	listaMensajes	: Array,
});

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/duckchat');

module.exports = mongoose.model('chat', chatSchema); 