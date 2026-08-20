const Service = require('../models/Service');
const createCrudController = require('../utils/createCrudController');

module.exports = createCrudController(Service, 'Service');
