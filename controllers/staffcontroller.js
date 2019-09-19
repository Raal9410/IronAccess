const User = require('../models/User')
const Guest = require('../models/Guest')
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
    
  console.log('>>>>>>>>>>', codeInv)  
  const invitedBy = req.user._id 
  const newguest=await Guest.create({...req.body, invitedBy, code: codeInv}) 
  .then(guest=> {
    console.log(guest)
  })
  res.redirect('/staffprofile')
  }

  exports.deleteGuest= async(req, res) => {
    const {id} = req.params
    await Guest.findByIdAndDelete(id)
    res.redirect('/staffprofile')
    
  }

  exports.editStudentForm = (req, res, next) =>{
    res.render('auth/edit-student', )
  }
  
  exports.editStudent = async (req, res, next) =>{
    const {name, lastName} = req.body 
    await User.findByIdAndUpdate(req.user._id, {name, lastName})
    res.redirect('/staffprofile')
  }


  
  //.populate('invitedBy')
  