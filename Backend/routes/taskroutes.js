const express = require("express");
const taskController = require("../controllers/taskController");
const router = express.Router();

router.post("/", taskController.createTask);
router.put("/:id", taskController.updateTask);
router.delete("/:id", taskController.deleteTask);
router.get("/", taskController.getTask);
router.put("/:id/pin", taskController.togglePin);
module.exports = router;
