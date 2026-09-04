import React from 'react';
import ManageResource from '../components/ManageResource';
import { certificatesService } from '../../services';

const fields = [
    { name: 'title', label: 'Title' },
    { name: 'organization', label: 'Organization' },
    { name: 'instructor', label: 'Instructor (optional)' },
    { name: 'description', label: 'What this certifies (optional)', type: 'textarea' },
    { name: 'issueDate', label: 'Issue Date', type: 'date' },
    { name: 'length', label: 'Length (optional)' },
    { name: 'certificateCode', label: 'Certificate Code (optional)' },
    { name: 'link', label: 'Certificate Link (optional)' },
];

const imageUpload = {
    fieldName: 'certificateImage',
    label: 'Certificate Image',
    multiple: false,
    existingValue: (item) => item.certificateImage,
};

const ManageCertificates = () => (
    <ManageResource
        service={certificatesService}
        title="Certificates"
        fields={fields}
        imageUpload={imageUpload}
        renderRow={(item) => `${item.title} — ${item.organization}`}
    />
);

export default ManageCertificates;
