'use strict';

const auth = require('basic-auth');
const jwt = require('jsonwebtoken');


const register = require('./controllers/register');
const login = require('./controllers/login');
const profile = require('./controllers/profile');

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

				res.setHeader('Location', '/users/'+userName);
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

	//GET
	router.get('/users/get/allcontacts', profile.allcontacts);
	

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