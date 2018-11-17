'use strict';

const user = require('../models/user');

exports.getProfile = userName => 
	
	new Promise((resolve,reject) => {

		user.find({ userName: userName }, { userName: 1, correo: 1,_id: 0 })

		.then(users => resolve(users[0]))

		.catch(err => reject({ status: 500, message: 'Internal Server Error !' }))

	});