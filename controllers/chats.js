'use strict';

const chat = require('../models/chat');

exports.crearchat = (username1, username2, llave) => 

	new Promise((resolve,reject) => {
        const newChat = new chat({
			contacto1: username1,
			contacto2: username2,
            llave: llave,
            listaMensajes: []
		});
        newChat.save()
        .then(() => resolve({ status: 201, message: 'Nuevo chat creado' }))
		.catch(err => reject({ status: 500, message: 'Internal Server Error !' }));

	});