'use strict';

const auth = require('basic-auth');
const jwt = require('jsonwebtoken');


const register = require('./controllers/register');
const login = require('./controllers/login');
const profile = require('./controllers/profile');
const chats = require('./controllers/chats');
const mensajes = require('./controllers/mensajes');

module.exports = router => {

	router.get('/', (req, res) => res.end('Welcome to Duck Chat !'));

	//POST
	router.post('/authenticate', (req, res) => {

		const credentials = auth(req);

		if (!credentials) {

			res.status(400).json({ message: 'Error al autenticar !' });

		} else {

			login.loginUser(credentials.name, credentials.pass)

			.then(result => {

				const token = jwt.sign(result, credentials.name, { expiresIn: 3600});
			
				res.status(result.status).json({ message: result.message, token: token });

			})

			.catch(err => res.status(err.status).json({ message: err.message }));
		}
	});

	//POST
	router.post('/users', (req, res) => {

		const userName = req.body.userName;
		const correo = req.body.correo;
		const contrasenia = req.body.contrasenia;

		if (!userName || !correo || !contrasenia || !userName.trim() || !correo.trim() || !contrasenia.trim()) {

			res.status(400).json({message: 'Error al crear usuario !'});

		} else {

			register.registerUser(userName, correo, contrasenia)

			.then(result => {

				res.setHeader('Location', '/users/');
				res.status(result.status).json({ message: result.message})
			})

			.catch(err => res.status(err.status).json({ message: err.message }));
		}
	});

	//GET
	router.get('/users/:id', (req,res) => {

		if (checkToken(req)) {

			profile.getProfile(req.params.id)

			.then(result => res.json(result))

			.catch(err => res.status(err.status).json({ message: err.message }));

		} else {

			res.status(401).json({ message: 'Error al iniciar sesion !' });
		}
	});

	//DELETE
	router.delete('/users/delete/:id', (req,res) =>{
		profile.eliminaruser(req.params.id)
		.then(result => res.json(result))
		.catch(err => res.status(err.status).json({ message: err.message }));
	});

	//POST
	router.post('/chats/mensajes/agregarmensaje', mensajes.crearmensaje);

	//GET
	router.get('/users/get/allcontacts', profile.allcontacts);

	//GET
	router.get('/chats/get/allchats/:id', chats.allchats);

	//POST
	router.post('/chats/allmessages', mensajes.allmessages);
	
	//POST
	router.post('/chats/nuevochat/create', (req, res) => {

		const username1 = req.body.contacto1;
		const username2 = req.body.contacto2;
		const llave = req.body.llave;

		if (!username1 || !username2|| !llave ) {

			res.status(400).json({message: 'Error al crear el chat !'});

		} else {

			chats.crearchat(username1, username2, llave)

			.then(result => {
				res.status(result.status).json({ message: result.message})
			})

			.catch(err => res.status(err.status).json({ message: err.message }));
		}
	});

	//FUNCTION
	function checkToken(req) {

		const token = req.headers['x-access-token'];

		if (token) {

			try {

  				var decoded = jwt.verify(token, req.params.id);

  				return decoded.message === req.params.id;

			} catch(err) {

				return false;
			}

		} else {

			return false;
		}
	}
}