import config from "../config";

import  nodemailer from "nodemailer"

export const sendEmail = async (to: string, html: string) => {
  console.log(config.mail,config.mail_pass, to)
 try {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: config.mail,
      pass: config.mail_pass,
    },
  });

   await transporter.sendMail({
    from: 'akonhasan680@gmail.com', // sender address
    to, // list of receivers
    subject: 'Please active your account!', // Subject line
    text: '', // plain text body
    html, // html body
  });
  
 } catch (error) {
  console.log(error)
 }

};
