import React from 'react';
import ManageResource from '../components/ManageResource';
import { projectsService } from '../../services';

const fields = [
    { name: 'title', label: 'Title' },
    { name: 'description', label: 'Description', type: 'textarea' },
    { name: 'technologies', label: 'Technologies' },
    { name: 'role', label: 'Role (optional)' },
    { name: 'features', label: 'Features (optional)', type: 'textarea' },
    { name: 'category', label: 'Category (e.g. web, flutter, cpp)' },
    { name: 'semester', label: 'Semester (1-8)', type: 'number' },
    { name: 'githubLink', label: 'GitHub Link (optional)' },
    { name: 'liveDemoLink', label: 'Live Demo Link (optional)' },
    { name: 'status', label: "Status ('completed' / 'upcoming' / 'in-progress')" },
];

const ManageProjects = () => (
    <ManageResource
        service={projectsService}
        title="Projects"
        fields={fields}
        renderRow={(item) => `${item.title} (Sem ${item.semester ?? '-'}) — ${item.technologies}`}
    />
);

export default ManageProjects;
