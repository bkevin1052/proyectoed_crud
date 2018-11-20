'use strict';

const user = require('../models/user');
const chat = require('../models/chat');

	exports.getProfile = userName => 
	
	new Promise((resolve,reject) => {

		user.find({ userName: userName }, { userName: 1, correo: 1,_id: 0 })

		.then(users => resolve(users[0]))

		.catch(err => reject({ status: 500, message: 'Internal Server Error !' }))

	});

	exports.eliminaruser = userName => 
	
	new Promise((resolve,reject) => {
		user.remove({userName: userName}, function(err) {
			if (!err) {
				return resolve({status:200, message:'Cuenta eliminada exitosamente'});
			}
			else {
				return reject({status:500, message:'Error al eliminar la cuenta'});
			}
		});
	});

	
