import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const sendMail = async (email: string, subject: string, text: string) => {
  return await resend.emails.send({
    from: 'Acme <onboarding@resend.dev>',
    to: email,
    subject,
    text
  })
}

export default sendMail;