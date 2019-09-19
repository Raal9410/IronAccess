const Guest = require('../models/Guest')


exports.editStudentForm = (req, res, next) =>{
  res.render('auth/edit-student', )
}

exports.editStudent = async (req, res, next) =>{
  const {name, lastName} = req.body 
  await User.findByIdAndUpdate(req.user._id, {name, lastName})
  res.redirect('/studentprofile')
}

exports.inviteGuestForm = async (req, res, next) => {
  res.render('auth/invite-guest')
}

exports.inviteGuest = async (req, res, next) =>{
const newGuest = await Guest.create({...req.body})
console.log(newGuest)
res.redirect('/staffprofile')
}
