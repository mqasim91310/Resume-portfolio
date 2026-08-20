import React from 'react';
import ManageResource from '../components/ManageResource';
import { experienceService } from '../../services';

const fields = [
    { name: 'company', label: 'Company' },
    { name: 'position', label: 'Position' },
    { name: 'department', label: 'Department / Track' },
    { name: 'duration', label: 'Duration' },
    { name: 'mode', label: 'Mode of Work' },
    { name: 'description', label: 'Description', type: 'textarea' },
    { name: 'order', label: 'Order', type: 'number' },
];

const ManageExperience = () => (
    <ManageResource
        service={experienceService}
        title="Experience"
        fields={fields}
        renderRow={(item) => `${item.position} — ${item.company}`}
    />
);

export default ManageExperience;
