'use strict';

const user = require('../models/user');

exports.registerUser = (userName, correo, contrasenia) => 

	new Promise((resolve,reject) => {

		const newUser = new user({
			userName: userName,
			correo: correo,
			contrasenia: contrasenia,
			listaChats: new Array,
			listaMensajes: new Array
		});

		newUser.save()

		.then(() => resolve({ status: 201, message: 'User Registered Sucessfully !' }))

		.catch(err => {

			if (err.code == 11000) {
						
				reject({ status: 409, message: 'User Already Registered !' });

			} else {

				reject({ status: 500, message: 'Internal Server Error !' });
			}
		});
	});