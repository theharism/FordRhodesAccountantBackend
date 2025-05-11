import nodemailer from 'nodemailer';

export async function POST(req) {
    try {
        const body = await req.json();
        const { name, email, phone, service, message } = body;

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        const mailOptions = {
            from: process.env.SMTP_USER,
            to: 'babar@fordrhodesaccountants.co.uk',
            subject: `New Contact Form Submission from ${name}`,
            html: `
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone}</p>
                <p><strong>Service:</strong> ${service}</p>
                <p><strong>Message:</strong><br/>${message}</p>
            `,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);

        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (error) {
        console.error('Email send failed:', error);
        return new Response(JSON.stringify({ error: 'Failed to send message' }), { status: 500 });
    }
}
