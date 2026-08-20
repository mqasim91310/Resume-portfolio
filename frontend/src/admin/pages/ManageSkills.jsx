import React from 'react';
import ManageResource from '../components/ManageResource';
import { skillsService } from '../../services';

const fields = [
    { name: 'name', label: 'Skill Name' },
    { name: 'percentage', label: 'Percentage (0-100)', type: 'number' },
    { name: 'category', label: 'Category' },
    { name: 'order', label: 'Order', type: 'number' },
];

const ManageSkills = () => (
    <ManageResource
        service={skillsService}
        title="Skills"
        fields={fields}
        renderRow={(item) => `${item.name} — ${item.percentage}% (${item.category})`}
    />
);

export default ManageSkills;
