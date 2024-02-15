const {register, login, avatar, getAllUsers} = require("../controllers/userControllers");

const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);
router.post("/avatar/:id", avatar);
router.get('/allusers/:id', getAllUsers);

module.exports = router;