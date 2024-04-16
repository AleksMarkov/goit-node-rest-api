import sgMail from "@sendgrid/mail";
import nodemailer from "nodemailer";
import "dotenv/config";

// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// const msg = {
//   to: "soncha@ukr.net",
//   from: "soncha@ukr.net",
//   subject: "Verify email",
//   text: "text from ",
// };

// sgMail
//   .send(msg)
//   .then(() => {
//     console.log("Email sent");
//   })
//   .catch((error) => {
//     console.error(error);
//   });

const { UKR_NET_PASSWORD, UKR_NET_FROM } = process.env;

const nodemailerConfig = {
  host: "smtp.ukr.net",
  port: 465,
  secure: true,
  auth: {
    user: UKR_NET_FROM,
    pass: UKR_NET_PASSWORD,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = (data) => {
  const email = { ...data, from: UKR_NET_FROM };
  return transport.sendMail(email);
};
export default sendEmail;
