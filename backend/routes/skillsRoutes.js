const createCrudRoutes = require('./createCrudRoutes');
const skillsController = require('../controllers/skillsController');

module.exports = createCrudRoutes(skillsController);
