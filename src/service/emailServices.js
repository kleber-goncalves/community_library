import nodemailer from "nodemailer";
import "dotenv/config";

// Configura o transporte de email usando o Gmail com autenticação usando o arquivo .env
const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
    },
});

// envia um email de lembrete para o user utilizando o email, o titulo do livro e a data de devolução
function sendEmail(email, bookTitle, dueDate) {
    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "Reminder: Book Due Approaching",
        html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
            <h2 style="color: #f60;">Lembrete da Biblioteca Comunitária</h2>
            <p>Olá,</p>
            <p>Este é um lembrete para a devolução do livro "${bookTitle}".</p>
            <p>Data de devolução: ${dueDate}</p>
            <p>Por favor, devolva o livro até a data indicada.</p>
            <p>Obrigado por utilizar nossa biblioteca!</p>
        </div>
        `,
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.error("Error sending email:", err);
        } else {
            console.log("Email sent:", info.response);
        }
    });
}

export default sendEmail;
