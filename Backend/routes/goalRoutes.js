const express = require("express")
const {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
} = require("../controllers/goalController");
const {verifyUser}=require("../middleware/authMiddleware")

const router = express.Router()

router.get("/",verifyUser, getGoals);

router.post("/",verifyUser,setGoal);

router.put("/:id",verifyUser, updateGoal);

router.delete("/:id",verifyUser, deleteGoal);
 
module.exports=router