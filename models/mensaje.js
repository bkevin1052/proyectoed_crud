'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mensajeSchema = mongoose.Schema({ 
	emisor :  String,
	receptor	: String, 
    mensaje	: String,
});

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/duckchat');

module.exports = mongoose.model('mensaje', mensajeSchema); 