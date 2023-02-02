const router = require('express').Router();

const { getUserMe, updateUserInfo } = require('../controllers/users');

router.get('/me', getUserMe);

router.patch('/me', updateUserInfo);

module.exports = router;
