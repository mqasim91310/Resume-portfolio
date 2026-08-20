import React from 'react';
import ManageResource from '../components/ManageResource';
import { educationService } from '../../services';

const fields = [
    { name: 'degree', label: 'Degree' },
    { name: 'institute', label: 'Institute' },
    { name: 'duration', label: 'Duration' },
    { name: 'description', label: 'Description', type: 'textarea' },
    { name: 'order', label: 'Order', type: 'number' },
];

const ManageEducation = () => (
    <ManageResource
        service={educationService}
        title="Education"
        fields={fields}
        renderRow={(item) => `${item.degree} — ${item.institute}`}
    />
);

export default ManageEducation;
