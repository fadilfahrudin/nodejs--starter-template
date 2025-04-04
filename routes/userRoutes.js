const express = require('express');
const router = express.Router();
const { getUsersController, getUserByIdController, updateUserController, deleteUserController, registrationController, loginController, logoutController, updateProfileController } = require('../controllers/userController.js');
const upload = require('../middlewares/multer.js');
const verifyToken = require('../middlewares/verifyToken.js');
const RefreshToken = require('../controllers/refreshTokenController.js');

router.get('/users', verifyToken, getUsersController);
router.get('/user/:id', getUserByIdController);
router.post('/user/register', registrationController);
router.patch('/user/:id', verifyToken, updateUserController);
router.delete('/user/delete/:id', verifyToken, deleteUserController);

router.post('/auth/login', loginController);
router.delete('/auth/logout', logoutController);
router.get('/auth/refresh-token', RefreshToken);

router.patch('/user/profile/:id', upload.single('profilePicture') ,updateProfileController);

module.exports = router;