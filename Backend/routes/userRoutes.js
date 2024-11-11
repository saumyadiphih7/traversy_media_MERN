const express = require("express")
const { registerUser, loginUser, getMe } = require("../controllers/userController")

const {verifyUser}=require("../middleware/authMiddleware")
const router = express.Router()

router.post("/",registerUser)
router.post("/login", loginUser)
router.get("/me", verifyUser,getMe);
module.exports=router