const express = require('express');
const router = express.Router();
const { registerAdmin, loginAdmin, getInterestedUsers, addInterestedUser, getAllAdmins, deleteAdmin } = require('../controllers/adminController');

router.post('/register', registerAdmin);

router.post('/login', loginAdmin);

router.get("/get/interested-users", getInterestedUsers);

router.post("/add/interested-users", addInterestedUser);

router.get('/all', getAllAdmins);
router.delete('/delete/:id', deleteAdmin);
module.exports = router;