import React from 'react';
import ManageResource from '../components/ManageResource';
import { servicesService } from '../../services';

const fields = [
    { name: 'title', label: 'Title' },
    { name: 'description', label: 'Description', type: 'textarea' },
    { name: 'icon', label: 'Icon name (optional)' },
    { name: 'order', label: 'Order', type: 'number' },
];

const ManageServices = () => (
    <ManageResource
        service={servicesService}
        title="Services"
        fields={fields}
        renderRow={(item) => item.title}
    />
);

export default ManageServices;
