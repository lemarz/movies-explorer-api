const router = require('express').Router();

const { getUserMe, updateUserInfo } = require('../controllers/users');
const { updateUserInfoValidator } = require('../middlewares/joiValidator');

router.get('/me', getUserMe);
router.patch('/me', updateUserInfoValidator, updateUserInfo);

module.exports = router;
