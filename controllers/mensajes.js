'use strict';

const mensaje = require('../models/mensaje');
const chat = require('../models/chat');

exports.crearmensaje = function(req,res){
         const emisor = req.body.Emisor;
		const receptor = req.body.Receptor;
		const Mensaje = req.body.mensaje;
	    var nuevosmensajes;
        const newMensaje = new mensaje({
			emisor: emisor,
			receptor: receptor,
            mensaje: Mensaje
        });
        chat.find({"$or":[{"$and":[{contacto1: emisor},{contacto2: receptor}]},{"$and":[{contacto2: emisor},{contacto1: receptor}]}]},function(err,chats){
            if(err) res.status(404).send(err.message);
            nuevosmensajes = chats[0].listaMensajes;
            nuevosmensajes[chats[0].listaMensajes.length] = newMensaje;
        });
        
        var millisecondsToWait = 500;
        setTimeout(function() {
         chat.findOneAndUpdate({"$or":[{"$and":[{contacto1: emisor},{contacto2: receptor}]},{"$and":[{contacto2: emisor},{contacto1: receptor}]}]}, {$set:{listaMensajes:nuevosmensajes}}, function (err, response) {
        if(err) res.status(404).send(err.message);
        
    })
}, millisecondsToWait);
         
};

exports.allmessages = function(req,res){

        const emisor = req.query.array[0];
        const receptor = req.query.array[1];

        chat.find({"$or":[{"$and":[{contacto1: emisor},{contacto2: receptor}]},{"$and":[{contacto2: emisor},{contacto1: emisor}]}]},function(err,chats){
			if(err) res.status(404).send(err.message);
			res.send(chats);			
		});
};
