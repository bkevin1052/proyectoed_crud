'use strict';

const mensaje = require('../models/mensaje');
const chat = require('../models/chat');

exports.crearmensaje = function(req,res){
         const emisor = req.body.Emisor;
		const receptor = req.body.Receptor;
		const mensaje = req.body.mensaje;
	    var nuevosmensajes;
        const newMensaje = new mensaje({
			emisor: emisor,
			receptor: receptor,
            mensaje: mensaje,
        });
        chat.find({"$or":[{"$and":[{contacto1: emisor},{contacto2: receptor}]},{"$and":[{contacto2: emisor},{contacto1: receptor}]}]},function(err,chats){
            if(err) res.status(404).send(err.message);
            nuevosmensajes = chats;
            chats.forEach(function(element){
                nuevosmensajes[chats.length +1 ] = newMensaje;
            })

        });
        
         chat.findOneAndUpdate({"$or":[{"$and":[{contacto1: emisor},{contacto2: receptor}]},{"$and":[{contacto2: emisor},{contacto1: receptor}]}]}, {$set:{listaMensajes:nuevosmensajes}}, function (err, response) {
            if(err) res.status(404).send(err.message);
            
        })
};