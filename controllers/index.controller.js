const User = require('../models/User')
const Guest = require('../models/Guest')
exports.loginForm = (req, res, next) => {
  res.render('auth/login')
}

exports.login = (req, res, next) => {
  if (req.user.role === 'BOSS') {
    res.redirect('/profile')
  } else if (req.user.role === 'STAFF') {
    res.redirect('/staffprofile')
  } else if (req.user.role === 'CHECKER') {
    res.redirect('/guestlist')
  } else if (req.user.role === 'STUDENT') {
    res.redirect('/studentprofile')
  }else{ 
    res.redirect('/login')
  }
}

exports.profile = async (req, res, next) => {
  const boss = await User.findById(req.user._id)
  //const users = await User.find()
  const staff = await (User.find({role: 'STAFF'}))
  const checker = await (User.find({role: 'CHECKER'}))
  res.render('auth/profile', {boss, staff, checker}) //, {user: req.user}
}

exports.staffprofile = async(req,res,next)=>{
const staff = await User.findById(req.user._id)
const student = await User.find({role: 'STUDENT'})
const guest = await Guest.find({invitedBy: req.user._id})
console.log(guest)
res.render('auth/staffprofile', {staff, student, guest}) //, {user: req.user}
}
exports.studentProfile = async(req,res,next)=>{
const student = await User.findById(req.user._id)
const guest = await Guest.find({invitedBy: req.user._id})
res.render('auth/studentprofile', {student, guest}) //, {user: req.user}
  }

exports.guestCheckProfileForm = async (req, res, next) => {
  const {code} = req.query
  const guest = await Guest.findOne({code: req.body.code})
  res.render('auth/guestlist', guest)
}

exports.guestCheckerForm = (req,res, next) => {
  res.render('auth/guestchecker')
}

exports.guestChecker = async(req,res, next) =>{
  const confirmguest = await Guest.findOne({code: req.query.code}).populate('invitedBy')
  console.log(confirmguest)
  res.render('auth/guestlist', confirmguest)
}

exports.removeGuest= async(req, res) => {
  const {code} = req.query
  await Guest.findOneAndDelete(code)
  res.redirect('/guestlist')
  
}

exports.logout =(req, res, next)=>{
  req.logout()
  res.redirect('login')
}