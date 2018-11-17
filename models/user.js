'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = mongoose.Schema({ 

	userName		: {type: String, unique: true},
	correo			: String, 
	contrasenia	: String,
	listaChats: Array,
	listaMensajes: Array
});

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/duckchat');

module.exports = mongoose.model('user', userSchema);  