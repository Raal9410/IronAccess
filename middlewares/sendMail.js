const nodemailer = require('nodemailer')
const Guest = require('../models/Guest')
exports.mail = async (req, res, next) => {
  const guestCode = await Guest.find({code})
  const { email, name, lastName, message, subject, date} = req.body
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
  })
  const info = await transporter.sendMail({
    from: ` IronAccess <${process.env.EMAIL}>`,
    to: email,
    subject: `You have been invited to Ironhack ${name} ${lastName}!`,
    text: message,
    html: `<p>${message}</p> <p>Your code is ${guestCode}</p><br> Invitation by`
  })
  //res.render('message', { email, subject, message, name, lastName, info, date, invitedBy })
  next()
}

//${guest.invitedBy.name} ${guest.invitedBy.lastName}