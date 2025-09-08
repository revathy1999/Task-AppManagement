const tasks = require("../models/Task");
exports.createTask = async (req, res) => {
  const task = new tasks({
    title: req.body.title,
    description: req.body.description,
    date: req.body.date,
    status: req.body.status,
    // createdBy:req.user.uid
  });
  try {
    const newtask = await task.save();
    console.log("newtask: ", newtask);
    res.status(201).json(newtask);
  } catch (err) {
    res
      .status(400)
      .json({ message: "Error creating task", error: err.message });
  }
};
exports.getTask = async (req, res) => {
  console.log("req user: ", req.user);
  
  try {
//     let task;
//     if(req.user.uid === "VHvLXcIdQfZiPRmpj6S6ic85icv1"){
//     task = await tasks.find({}); //fetch all docs in the tasks collection...no filter, return all
//     }
//     else{
// task=await tasks.find({createdBy: req.user.uid});
//     }
const gettasks=await tasks.find({});
if(!gettasks){
  return res.status(404).json({ message: "Task Not found" })
}
    res.json(gettasks);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching tasks", error: err.message });
  }
};
exports.updateTask = async (req, res) => {
  try {
    const updatetask = await tasks.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }); //new:true return updated new doc instead of old
    console.log("params: ", req.params.id, "req.body: ", req.body);
    if (!updatetask) {
      return res.status(404).json({ message: "Task Not found" });
    }
    res.json(updatetask); //convert to json and send it as response
  } catch (err) {
    res
      .status(400)
      .json({ message: "Unable to update task", error: err.message });
  }
};
exports.deleteTask = async (req, res) => {
  try {
    const deletetask = await tasks.findByIdAndDelete(req.params.id);
    if (!deletetask) {
      return res.status(404).json({ message: "Task Not found" });
    }
    res.json({ message: "Task deleted Successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Unable to delete task", error: err.message });
  }
};
exports.togglePin = async (req, res) => {
  try {
    const pintask = await tasks.findById(req.params.id);
    if (!pintask) {
      return res.status(404).json({ message: "Task Not found" });
    }
    // toggle value
    pintask.pinned = !pintask.pinned;
    await pintask.save();
    res.json({
      message: `Task ${pintask.pinned ? "Pinned" : "Unpinned"} Successfully`,
      pintask,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Unable to update pin status", error: err.message });
  }
};
