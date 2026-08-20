import api from './api';

// Builds a small {getAll, getOne, create, update, remove} client for a
// REST resource, so each resource file doesn't repeat the same axios calls.
const createResourceService = (basePath) => ({
    getAll: (params) => api.get(basePath, { params }).then((res) => res.data),
    getOne: (id) => api.get(`${basePath}/${id}`).then((res) => res.data),
    create: (data, config) => api.post(basePath, data, config).then((res) => res.data),
    update: (id, data, config) => api.put(`${basePath}/${id}`, data, config).then((res) => res.data),
    remove: (id) => api.delete(`${basePath}/${id}`).then((res) => res.data),
});

export default createResourceService;
