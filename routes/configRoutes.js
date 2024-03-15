const toysR = require('./toys');
const usersR = require('./users');

exports.routesInit = (app) => {
    app.use('/toys', toysR);
    app.use('/users', usersR);
    app.use((req, res) => {
        res.status(404).json({ message: 'Resource not found. api documentation at localhost:port/public/api.html' });
    });
    }