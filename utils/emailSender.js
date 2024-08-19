import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
    host: "smtp.hostinger.com",
    port: 465,
    secure: true,
    auth: {
        user: "help@theedmentor.com",
        pass: "Lavender@21",
    },
});
export const sendEmail = async (to, subject, text) => {
    try {
        await transporter.sendMail({
            from: "help@theedmentor.com",
            to,
            subject,
            text,
        });
        console.log("Email sent successfully");
    } catch (error) {
        console.error("Error sending email:", error);
        throw new Error("Failed to send email");
    }
};