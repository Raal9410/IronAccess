const router = require('express').Router()
const passport = require('../handlers/passport')
const ensureLogin = require('connect-ensure-login')
const { catchErrors } = require('../middlewares/catchErrors')
const checkRole = require('../middlewares/checkRole')

const {login, loginForm, logout, profile, staffprofile, studentProfile, guestCheckProfileForm, guestChecker} = require('../controllers/index.controller')

const {createUser, createUserForm, deleteUser} = require('../controllers/bosscontroller')
const {editStaffForm, editStaff, createStudentForm, createStudent, deleteStudent, inviteGuestForm, inviteGuest, deleteGuest} = require('../controllers/staffcontroller')
const {studentGuest, studentGuestForm, deleteStudentGuest} = require('../controllers/studentscontroller')

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index')
})

router.get('/login', loginForm)
router.post('/login', passport.authenticate('local'), login)
//Boss routes
router.get('/profile', checkRole('BOSS'), ensureLogin.ensureLoggedIn(), profile)
router.get('/create-staff', ensureLogin.ensureLoggedIn(), checkRole('BOSS'), createUserForm)
router.post('/create-staff', ensureLogin.ensureLoggedIn(), checkRole('BOSS'), catchErrors(createUser))
router.get('/delete-user/:id', ensureLogin.ensureLoggedIn(), checkRole('BOSS'), catchErrors(deleteUser))

//Staff routes
router.get('/staffprofile', checkRole('STAFF'), ensureLogin.ensureLoggedIn(), staffprofile)
router.get('/edit-staff', checkRole('STAFF'), ensureLogin.ensureLoggedIn(), editStaffForm)
router.post('/edit-staff', checkRole('STAFF'), ensureLogin.ensureLoggedIn(), catchErrors(editStaff))
router.get('/create-student', checkRole('STAFF'), ensureLogin.ensureLoggedIn(), createStudentForm)
router.post('/create-student', checkRole('STAFF'), ensureLogin.ensureLoggedIn(), catchErrors(createStudent))
router.get('/invite-guest', ensureLogin.ensureLoggedIn(), checkRole('STAFF'), inviteGuestForm)
router.post('/invite-guest', ensureLogin.ensureLoggedIn(), checkRole('STAFF'), catchErrors(inviteGuest))
router.get('/delete-guest/:id', ensureLogin.ensureLoggedIn(), checkRole('STAFF'), catchErrors(deleteGuest))
router.get('/delete-student/:id', ensureLogin.ensureLoggedIn(), checkRole('STAFF'), catchErrors(deleteStudent))

//Student routes
router.get('/studentprofile', checkRole('STUDENT'), ensureLogin.ensureLoggedIn(), studentProfile)
router.get('/student-guest', ensureLogin.ensureLoggedIn(), checkRole('STUDENT'), studentGuestForm)
router.post('/student-guest', ensureLogin.ensureLoggedIn(), checkRole('STUDENT'), catchErrors(studentGuest))
router.get('/delete-student-guest/:id', ensureLogin.ensureLoggedIn(), checkRole('STUDENT'), catchErrors(deleteStudentGuest))

//Checker routes
router.get('/guestchecker', checkRole('CHECKER'), ensureLogin.ensureLoggedIn(), guestCheckProfileForm)
router.post('/guestchecker', checkRole('CHECKER'), ensureLogin.ensureLoggedIn(), catchErrors(guestChecker))
router.get('/logout', logout)
module.exports = router
