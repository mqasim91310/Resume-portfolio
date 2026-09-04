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
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp'];
const RESUME_TYPES = ['application/pdf'];
const RESUME_EXTENSIONS = ['.pdf'];

const storage = (type) =>
    multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.join(UPLOAD_ROOT, SUBFOLDERS[type] || 'misc'));
        },
        filename: (req, file, cb) => {
            const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
            // Extension is validated against an allowlist in fileFilter below,
            // but strip anything unexpected here too rather than trusting the
            // client-supplied filename outright.
            const ext = path.extname(file.originalname).toLowerCase().replace(/[^a-z0-9.]/g, '');
            cb(null, `${type}-${uniqueSuffix}${ext}`);
        },
    });

// The client declares both a MIME type and a filename/extension when
// uploading — both are attacker-controlled and can disagree (e.g. a file
// named "evil.html" sent with Content-Type: image/jpeg). Checking only the
// declared MIME type isn't enough: since uploaded files are later served by
// express.static() based on their actual extension, an accepted mismatch
// could get served back with Content-Type: text/html and execute as a page.
// Requiring both to match a known-safe pair closes that gap.
const fileFilter = (allowedTypes, allowedExtensions) => (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedTypes.includes(file.mimetype) && allowedExtensions.includes(ext)) {
        cb(null, true);
    } else {
        cb(new ApiError(400, `Unsupported file type: ${file.mimetype}`), false);
    }
};

const makeUploader = (type, allowedTypes, allowedExtensions, maxSizeMB) =>
    multer({
        storage: storage(type),
        fileFilter: fileFilter(allowedTypes, allowedExtensions),
        limits: { fileSize: maxSizeMB * 1024 * 1024 },
    });

module.exports = {
    uploadProfileImage: makeUploader('profile', IMAGE_TYPES, IMAGE_EXTENSIONS, 5).single('profileImage'),
    uploadProjectImages: makeUploader('project', IMAGE_TYPES, IMAGE_EXTENSIONS, 5).array('images', 6),
    uploadCertificateImage: makeUploader('certificate', IMAGE_TYPES, IMAGE_EXTENSIONS, 5).single('certificateImage'),
    uploadResume: makeUploader('resume', RESUME_TYPES, RESUME_EXTENSIONS, 10).single('resume'),
    SUBFOLDERS,
    UPLOAD_ROOT,
};
