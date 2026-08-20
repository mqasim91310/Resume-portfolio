import React from 'react';
import ManageResource from '../components/ManageResource';
import { certificatesService } from '../../services';

const fields = [
    { name: 'title', label: 'Title' },
    { name: 'organization', label: 'Organization' },
    { name: 'instructor', label: 'Instructor (optional)' },
    { name: 'issueDate', label: 'Issue Date', type: 'date' },
    { name: 'length', label: 'Length (optional)' },
    { name: 'certificateCode', label: 'Certificate Code (optional)' },
    { name: 'link', label: 'Certificate Link (optional)' },
];

const ManageCertificates = () => (
    <ManageResource
        service={certificatesService}
        title="Certificates"
        fields={fields}
        renderRow={(item) => `${item.title} — ${item.organization}`}
    />
);

export default ManageCertificates;
