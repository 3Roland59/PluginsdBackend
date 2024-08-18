const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'amarteyroland360@gmail.com',
    pass: 'fjwgdcbiizgayope'
  }
});

const sendTokenEmail = (email, code) =>{
    try {
    const mailOptions = {
        from: 'pluginsd@gmail.com',
        to: String(email),
        subject: 'Pluginsd Email Verification',
        text: `Please verify your email with this token. ${code}`
      };
      
     transporter.sendMail(mailOptions,function(error, info){
        if (error) {
          console.log('Error ',error);
          return false
        } else {
          console.log('Email sent: ' + info.response);
          return true
        }
      });
    } catch (error) {
        throw new Error(error)
    }
}

 const sendEmail = (from, to,subject,text) =>{
  try {
    const mailOptions = {
        from,
        to,
        subject,
        text
      };
      
     transporter.sendMail(mailOptions,async function(error, info){
        if (error) {
          console.log('Error ',error);
          return false
        } else {
          console.log('Email sent: ' + info.response);
          return true
        }
      });
    } catch (error) {
        throw new Error(error)
    }
}

module.exports = {sendTokenEmail, sendEmail}

