const Guest = require('../models/Guest')


exports.studentGuestForm = async (req, res, next) => {
  res.render('auth/student-guest')
}

exports.studentGuest = async (req, res, next) =>{
const invitedBy = req.user._id  
const newGuest = await Guest.create({...req.body, invitedBy}) 
console.log(newGuest)
res.redirect('/studentprofile')
}

exports.deleteStudentGuest= async(req, res) => {
  const {id} = req.params
  await Guest.findByIdAndDelete(id)
  res.redirect('/studentprofile')
  
}