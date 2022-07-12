const express = require('express')
const router = express.Router();
const userController = require('../controllers/userController')
const auth = require('../middleware/auth')

router.route('/profile')
.get(auth('readOwn', 'profile'), userController.findUser)
.patch(auth('updateOwn', 'profile'), userController.updateProfile)

router.patch('/email', auth('updateOwn', 'profile'), userController.updateUserEmail)
router.get('/verify',userController.verifyAccout)
module.exports = router;