const nodemailer = require('nodemailer')

exports.mail = async (req, res, next) => {
  const { email, name, lastName, message, subject, date, invitedBy} = req.body
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
    html: `<p>${message}</p> <br> Invitation by <h3></h3>`
  })
  //res.render('message', { email, subject, message, name, lastName, info, date, invitedBy })
  next()
}

//${guest.invitedBy.name} ${guest.invitedBy.lastName}