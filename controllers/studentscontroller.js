const Guest = require('../models/Guest')

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
.then(guest=> {
  console.log(guest)
})
res.redirect('/studentprofile')
}