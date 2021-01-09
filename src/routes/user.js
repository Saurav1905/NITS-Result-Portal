/** Write User routes here */
const router = require('express').Router()
const userController = require('../controllers/user')
const upload = require('../utils/uploadToS3')
const { auth, isLoggedIn } = require('../middlewares/auth')

router.post('/login', userController.login_post)
router.post('/register', userController.register)
router.get('/login', isLoggedIn, userController.login_get)
router.get('/logout', auth, userController.logout_get)
router.get('/profile', auth, userController.profile_get)
router.get('/settings', auth, userController.settings_get)
router.post(
    '/settings/profile/image/:userId',
    auth,
    upload.single('profileImage'),
    userController.changeProfileImage
)

router.post(
    '/settings/profile/edit/:userId',
    auth,
    userController.editProfileCredentials
)
router.get('/forgotPassword', userController.getForgotPasswordForm)

router.post('/forgotPassword', userController.forgotPassword)
router.get('/resetPassword/:sch_id/:token', userController.getPasswordResetForm)
router.post('/resetPassword/:sch_id/:token', userController.resetPassword)

module.exports = router
