import '../utils/loadEnv.js'
import sendEmail  from "./sendEmail.js";
const sendVerificationEmail = async (email, verificationToken) => {
  const verificationLink =
    process.env.ORIGIN + `/verify-email?email=${email}&verificationToken=${verificationToken}`;

  const html = `<h4>hi dear!</h4>
    <p>please verify your email by clicking on below link:
    <a href="${verificationLink}">Verify Email</a></p>`;

  return sendEmail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Email Verification",
    html,
  });
};

const sendVerificationCode = async () => {};

export {

  sendVerificationCode,
  sendVerificationEmail,
};
