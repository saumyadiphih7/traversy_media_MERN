const asyncHandler = require("express-async-handler")
const mongoose=require("mongoose")
const Goal = require("../model/goalModel")
const User=require("../model/userModel")
///@desc Get goals
// @route GET /api/goals
//@access




const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({user:req.user._id})
  
  res.status(200).json(goals);
})


///@desc set goal
// @route POST /api/goals
//@access Private


const setGoal =asyncHandler( async (req, res) => {
  console.log(req.body);
  if (!req.body.text) {
    // res.status(400).json({message:"Please add a text"})
    res.status(400);
    throw new Error("please add a field"); // express error handler
  }

  const goal = await Goal.create({
    text: req.body.text,
    user : req.user._id
  })
  res.status(200).json(goal);
});



///@desc Update goal
// @route PUT /api/goals/:id
//@access Private


const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id)
  
  if (!goal) {
    res.status(400)
    throw new Error("Goal not found")
  }

  const user = await User.findById(req.user._id)
  if (!user) {
    res.status(401)
    throw new Error("User not found")
  }
  if (goal.user.toString() != user._id) {
    res.status(401)
    throw new Error("User not authorized")
  }
  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, { new: true })
  
  res.status(200).json(updatedGoal);
});



///@desc Get goals
// @route GET /api/goals
//@access Private


const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id)
  if (!goal) {
    res.status(400)
    throw new Error("Goal not found")
  }

  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  if (goal.user.toString() != user._id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  const deletedGoal=await Goal.findByIdAndDelete(req.params.id)
  res.status(200).json(deletedGoal);
});





module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
};