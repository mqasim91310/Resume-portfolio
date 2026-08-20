import api from './api';
import createResourceService from './createResourceService';

export const skillsService = createResourceService('/skills');
export const educationService = createResourceService('/education');
export const experienceService = createResourceService('/experience');
export const projectsService = createResourceService('/projects');
export const certificatesService = createResourceService('/certificates');
export const servicesService = createResourceService('/services');

export const aboutService = {
    get: () => api.get('/about').then((res) => res.data),
    update: (data, config) => api.put('/about', data, config).then((res) => res.data),
    updateResume: (formData) =>
        api
            .put('/about/resume', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
            .then((res) => res.data),
};

export const statisticsService = {
    get: () => api.get('/statistics').then((res) => res.data),
    update: (data) => api.put('/statistics', data).then((res) => res.data),
};

export const contactService = {
    submit: (data) => api.post('/contact', data).then((res) => res.data),
    getAll: () => api.get('/contact').then((res) => res.data),
    markAsRead: (id) => api.put(`/contact/${id}/read`).then((res) => res.data),
    remove: (id) => api.delete(`/contact/${id}`).then((res) => res.data),
};

export const authService = {
    login: (email, password) => api.post('/auth/login', { email, password }).then((res) => res.data),
    logout: () => api.post('/auth/logout').then((res) => res.data),
    getProfile: () => api.get('/auth/profile').then((res) => res.data),
};
