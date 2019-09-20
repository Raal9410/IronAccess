const User = require('../models/User')
const Guest = require('../models/Guest')
const nodemailer = require('nodemailer')

exports.editStaffForm = (req, res, next) =>{
    res.render('auth/edit-staff', )
}

exports.editStaff = async (req, res, next) =>{
    const {name, lastName} = req.body 
    await User.findByIdAndUpdate(req.user._id, {name, lastName})
    res.redirect('/staffprofile')
}

exports.createStudentForm = async (req,res,next)=>{
  res.render('auth/create-student')
}

exports.createStudent = async (req, res, next)=>{
  const newStudent = await User.register({...req.body}, req.body.password)
  console.log(newStudent)
  res.redirect('/staffprofile')
}

exports.deleteStudent= async(req, res) => {
    const {id} = req.params
    await User.findByIdAndDelete(id)
    res.redirect('/staffprofile')
    
  }
  exports.inviteGuestForm = async (req, res, next) => {
    res.render('auth/invite-guest')
  }
  
  exports.inviteGuest = async (req, res, next) =>{
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
    subject: `¡Has sido invitado a Ironhack ${name} ${lastName}!!`,
    text: message,
    html: `<p>${message}</p> <p>Tu código de acceso es: <br> <b>${codeInv}</b></p> <br><br><br> Invitado por <b>Ironhack</b> `
  })
  //res.render('message', { email, subject, message, name, lastName, info, date, invitedBy })
  next()

  res.redirect('/staffprofile')
  }

  exports.deleteGuest= async(req, res) => {
    const {id} = req.params
    await Guest.findByIdAndDelete(id)
    res.redirect('/staffprofile')
    
  }

  
  //.populate('invitedBy')
  