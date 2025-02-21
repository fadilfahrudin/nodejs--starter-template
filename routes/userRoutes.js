const express = require('express');
const router = express.Router();
const { getUsersController, getUserByIdController, updateUserController, deleteUserController, registrationController, loginController, logoutController, updateProfileController } = require('../controllers/userController.js');
const upload = require('../middlewares/multer.js');

router.get('/', getUsersController);
router.get('/:id', getUserByIdController);
router.post('/', registrationController);
router.patch('/:id', updateUserController);
router.delete('/delete/:id', deleteUserController);

router.post('/login', loginController);
router.delete('/logout', logoutController);

router.patch('/profile/:id', upload.single('profilePicture') ,updateProfileController);

module.exports = router;