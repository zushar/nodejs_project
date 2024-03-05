const toysR = require('./toys');

exports.routesInit = (app) => {
    app.use('/toys', toysR);
    }