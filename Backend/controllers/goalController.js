const asyncHandler=require("express-async-handler")

///@desc Get goals
// @route GET /api/goals
//@access




const getGoals =asyncHandler( async(req, res) => {
    res.status(200).json({ message: "Get goals" });
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
  res.status(200).json({ message: "Set goals" });
});



///@desc Update goal
// @route PUT /api/goals/:id
//@access Private


const updateGoal =asyncHandler( async (req, res) => {
  res.status(200).json({ message: `Update goal ${req.params.id}` });
});



///@desc Get goals
// @route GET /api/goals
//@access


const deleteGoal =asyncHandler( async (req, res) => {
  res.status(200).json({ message: `delete goals ${req.params.id}` });
});





module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
};