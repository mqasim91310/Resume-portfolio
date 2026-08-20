const createCrudRoutes = require('./createCrudRoutes');
const educationController = require('../controllers/educationController');

module.exports = createCrudRoutes(educationController);
