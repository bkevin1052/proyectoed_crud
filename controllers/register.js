'use strict';

const user = require('../models/user');

exports.registerUser = (userName, correo, contrasenia) => 

	new Promise((resolve,reject) => {

		const newUser = new user({
			userName: userName,
			correo: correo,
			contrasenia: contrasenia
		});

		newUser.save()

		.then(() => resolve({ status: 201, message: 'Usuario registrado correctamente!' }))

		.catch(err => {

			if (err.code == 11000) {
						
				reject({ status: 409, message: 'Usuario ya existente!' });

			} else {

				reject({ status: 500, message: 'Internal Server Error !' });
			}
		});
	});