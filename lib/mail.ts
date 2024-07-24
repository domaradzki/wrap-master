import email from "next-auth/providers/email";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const domain = process.env.NEXT_PUBLIC_APP_URL;

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Kod 2FA",
    html: `<p>Twój kod 2FA: ${token}</p>`,
  });
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/authentication/new-verification?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Potwierdz swój email!",
    html: `<p>Kliknij <a href="${confirmLink}"> tutaj</a>, aby potwierdzić swój email.</p>`,
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${domain}/authentication/new-password?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Reset hasła!",
    html: `<p>Kliknij <a href="${resetLink}"> tutaj</a>, aby zresetować hasło.</p>`,
  });
};
