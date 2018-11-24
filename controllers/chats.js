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
		
.catch(err => {
	if (err.code == 11000) {
		
	reject({ status: 409, message: 'Chat ya existente!' });

} else {

	reject({ status: 500, message: 'Internal Server Error !' });
}

});				
	});

//FALTA FILTRAR QUE RETORNE SOLO LOS CHATS QUE CONTENTAN EL NOMBRE DEL USUARIO
exports.allchats = function(req,res){
	chat.find({"$or":[{contacto1: req.params.id},{contacto2: req.params.id}]},function(err,chats){
		if(err) res.status(404).send(err.message);
		res.send(chats);			
	});
};