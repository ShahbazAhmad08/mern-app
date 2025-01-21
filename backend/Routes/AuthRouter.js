const { singup, login } = require("../Controllers/AuthControler");
const {
  singupValidation,
  loginValidation,
} = require("../Middlewares/AuthValidation");

const router = require("express").Router();

router.post("/singup", singupValidation, singup);
router.post("/login", loginValidation, login);

module.exports = router;
