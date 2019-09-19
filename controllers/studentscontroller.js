const Guest = require('../models/Guest')
const nodemailer = require('nodemailer')

exports.deleteStudentGuest= async(req, res) => {
  const {id} = req.params
  await Guest.findByIdAndDelete(id)
  res.redirect('/studentprofile')
  
}

exports.studentGuestForm = async (req, res, next) => {
  res.render('auth/student-guest')
}

exports.studentGuest = async (req, res, next) =>{
  const createCode  = () =>{
    min = 1000
    max = 9999
    return  parseInt(Math.random( )*(max-min)+ min)      
  }

  let codeInv = createCode()  
const invitedBy = req.user._id 
const newguest=await Guest.create({...req.body, invitedBy, code: codeInv}) 
const { email, name, lastName, message} = req.body
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
  html: `<p>${message}</p> <p>Your code is <b>${codeInv}</b></p> <br><br> Invitation by <b>Ironhack</b> `
})
//res.render('message', { email, subject, message, name, lastName, info, date, invitedBy })
next()

res.redirect('/studentprofile')
}