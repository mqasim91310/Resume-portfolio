const nodemailer = require('nodemailer');
const logger = require('../utils/logger');

let transporter;

const getTransporter = () => {
    if (!transporter) {
        transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: Number(process.env.EMAIL_PORT) || 587,
            secure: Number(process.env.EMAIL_PORT) === 465,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });
    }
    return transporter;
};

const sendContactNotification = async ({ name, email, subject, message }) => {
    try {
        const mailer = getTransporter();
        await mailer.sendMail({
            from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
            to: process.env.ADMIN_NOTIFY_EMAIL || process.env.EMAIL_USER,
            replyTo: email,
            subject: `New portfolio contact: ${subject || 'No subject'}`,
            html: `
                <h2>New message from your portfolio contact form</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Subject:</strong> ${subject || 'N/A'}</p>
                <p><strong>Message:</strong></p>
                <p>${message.replace(/\n/g, '<br/>')}</p>
            `,
        });
        return true;
    } catch (error) {
        // Don't let email failures break the contact form submission —
        // the message is already saved to MongoDB regardless.
        logger.error(`Email notification failed: ${error.message}`);
        return false;
    }
};

module.exports = { sendContactNotification };
