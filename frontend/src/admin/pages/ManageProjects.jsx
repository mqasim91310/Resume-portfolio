import React from 'react';
import ManageResource from '../components/ManageResource';
import { projectsService } from '../../services';

const fields = [
    { name: 'title', label: 'Title' },
    { name: 'description', label: 'Description', type: 'textarea' },
    { name: 'technologies', label: 'Technologies' },
    { name: 'role', label: 'Role (optional)' },
    { name: 'features', label: 'Key Features (optional, comma-separated)', type: 'textarea' },
    { name: 'problem', label: 'Problem it addresses (optional)', type: 'textarea' },
    { name: 'solution', label: 'Solution / approach (optional)', type: 'textarea' },
    { name: 'techHighlights', label: 'Technical highlights (optional)', type: 'textarea' },
    { name: 'contribution', label: 'My contribution (optional)', type: 'textarea' },
    { name: 'challenges', label: 'Challenges faced (optional)', type: 'textarea' },
    { name: 'outcome', label: 'Outcome / result (optional)', type: 'textarea' },
    { name: 'category', label: 'Category (e.g. web, flutter, cpp)' },
    { name: 'semester', label: 'Semester (1-8)', type: 'number' },
    { name: 'githubLink', label: 'GitHub Link (optional)' },
    { name: 'liveDemoLink', label: 'Live Demo Link (optional)' },
    { name: 'status', label: "Status ('completed' / 'upcoming' / 'in-progress')" },
    { name: 'featured', label: 'Featured on homepage', type: 'checkbox' },
];

const imageUpload = {
    fieldName: 'images',
    label: 'Screenshots',
    multiple: true,
    existingValue: (item) => item.images,
    // Lets ManageResource show a remove button on each existing thumbnail.
    onRemoveExisting: (item, index) => projectsService.removeImage(item._id, index),
};

const ManageProjects = () => (
    <ManageResource
        service={projectsService}
        title="Projects"
        fields={fields}
        imageUpload={imageUpload}
        renderRow={(item) => `${item.title} (Sem ${item.semester ?? '-'}) — ${item.technologies}`}
    />
);

export default ManageProjects;
