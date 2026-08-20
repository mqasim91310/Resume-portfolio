const express = require('express');
const { protect } = require('../middleware/auth');

// Wires up standard GET/GET:id/POST/PUT:id/DELETE:id routes for a
// controller produced by createCrudController.
const createCrudRoutes = (controller) => {
    const router = express.Router();

    router.get('/', controller.getAll);
    router.get('/:id', controller.getOne);
    router.post('/', protect, controller.create);
    router.put('/:id', protect, controller.update);
    router.delete('/:id', protect, controller.remove);

    return router;
};

module.exports = createCrudRoutes;
