'use strict';

const user = require('../models/user');

exports.loginUser = (userName, contrasenia) => 

	new Promise((resolve,reject) => {

		user.find({userName: userName})

		.then(users => {

			if (users.length == 0) {

				reject({ status: 404, message: 'Usuario no encontrado !' });

			} else {

				return users[0];
				
			}
		})

		.then(user => {

			const contra = user.contrasenia;

			if (contra === contrasenia) {

				resolve({ status: 200, message: userName });

			} else {

				reject({ status: 401, message: 'Invalid Credentials !' });
			}
		})

		.catch(err => reject({ status: 500, message: 'Internal Server Error !' }));

	});