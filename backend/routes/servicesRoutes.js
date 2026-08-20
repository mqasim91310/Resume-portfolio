const createCrudRoutes = require('./createCrudRoutes');
const servicesController = require('../controllers/servicesController');

module.exports = createCrudRoutes(servicesController);
