const createCrudRoutes = require('./createCrudRoutes');
const experienceController = require('../controllers/experienceController');

module.exports = createCrudRoutes(experienceController);
