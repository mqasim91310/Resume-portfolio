const multer = require('multer');
const path = require('path');
const fs = require('fs');
const ApiError = require('../utils/ApiError');

const UPLOAD_ROOT = path.join(__dirname, '..', 'uploads');

const SUBFOLDERS = {
    profile: 'profile',
    project: 'projects',
    certificate: 'certificates',
    resume: 'resume',
};

// Make sure every subfolder exists at boot
Object.values(SUBFOLDERS).forEach((folder) => {
    const dir = path.join(UPLOAD_ROOT, folder);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

const IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
const RESUME_TYPES = ['application/pdf'];

const storage = (type) =>
    multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.join(UPLOAD_ROOT, SUBFOLDERS[type] || 'misc'));
        },
        filename: (req, file, cb) => {
            const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
            const ext = path.extname(file.originalname);
            cb(null, `${type}-${uniqueSuffix}${ext}`);
        },
    });

const fileFilter = (allowedTypes) => (req, file, cb) => {
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new ApiError(400, `Unsupported file type: ${file.mimetype}`), false);
    }
};

const makeUploader = (type, allowedTypes, maxSizeMB) =>
    multer({
        storage: storage(type),
        fileFilter: fileFilter(allowedTypes),
        limits: { fileSize: maxSizeMB * 1024 * 1024 },
    });

module.exports = {
    uploadProfileImage: makeUploader('profile', IMAGE_TYPES, 5).single('profileImage'),
    uploadProjectImages: makeUploader('project', IMAGE_TYPES, 5).array('images', 6),
    uploadCertificateImage: makeUploader('certificate', IMAGE_TYPES, 5).single('certificateImage'),
    uploadResume: makeUploader('resume', RESUME_TYPES, 10).single('resume'),
    SUBFOLDERS,
    UPLOAD_ROOT,
};
