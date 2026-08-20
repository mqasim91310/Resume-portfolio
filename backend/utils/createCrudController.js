const asyncHandler = require('express-async-handler');
const ApiError = require('../utils/ApiError');

// Generates standard getAll/getOne/create/update/delete handlers for a
// Mongoose model so simple CRUD resources don't need hand-written repeats.
const createCrudController = (Model, resourceName = 'Resource') => {
    const getAll = asyncHandler(async (req, res) => {
        const items = await Model.find().sort({ order: 1, createdAt: -1 });
        res.status(200).json({ success: true, count: items.length, data: items });
    });

    const getOne = asyncHandler(async (req, res) => {
        const item = await Model.findById(req.params.id);
        if (!item) throw new ApiError(404, `${resourceName} not found`);
        res.status(200).json({ success: true, data: item });
    });

    const create = asyncHandler(async (req, res) => {
        const item = await Model.create(req.body);
        res.status(201).json({ success: true, message: `${resourceName} created`, data: item });
    });

    const update = asyncHandler(async (req, res) => {
        const item = await Model.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!item) throw new ApiError(404, `${resourceName} not found`);
        res.status(200).json({ success: true, message: `${resourceName} updated`, data: item });
    });

    const remove = asyncHandler(async (req, res) => {
        const item = await Model.findByIdAndDelete(req.params.id);
        if (!item) throw new ApiError(404, `${resourceName} not found`);
        res.status(200).json({ success: true, message: `${resourceName} deleted` });
    });

    return { getAll, getOne, create, update, remove };
};

module.exports = createCrudController;
