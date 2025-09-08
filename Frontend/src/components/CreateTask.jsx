import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { MenuItem, Select } from "@mui/material";
import axios from "axios";
import { useSnackbar } from "../context/SnackbarProvider";
import axiosInstance from "../axios/axiosInstance";
export default function CreateTask({
  open,
  onClose,
  addTask,
  editTaskdata,
  onTaskUpdate,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [date, setDate] = useState("");
  const setNotify = useSnackbar();
  // editTaskdata holds clicked item from home, so this will set values to inputs which we click
  useEffect(() => {
    console.log("edit");
    console.log(editTaskdata);
    if (editTaskdata) {
      setTitle(editTaskdata.title);
      setDescription(editTaskdata.description);
      setDate(editTaskdata.date);
      setStatus(editTaskdata.status);
    } else {
      setTitle("");
      setStatus("");
      setDescription("");
      setDate("");
    }
    console.log("after edit: ", editTaskdata);
  }, [editTaskdata]);

  // submit task values
  const handleSubmit = (event) => {
    event.preventDefault();
    
        try{
    if(editTaskdata){
      axios.put(`http://localhost:5000/tasks/${editTaskdata._id}`,{
        title,description,date,status
      }).then((res)=>{
      onTaskUpdate(res.data, editTaskdata.index)
      })

        setNotify({
          open: true,
          message: "✅Task Updated Successfully!",
          severity: "success",
        });
      } else {
         axios
      .post("http://localhost:5000/tasks", {
        title,
        description,
        status,
        date,
        
      })
      .then((res) => {
        console.log(res.data);
        addTask(res.data);  // send res back to home
      });

        setNotify({
          open: true,
          message: "✅Task Created Successfully!",
          severity: "success",
        });
      }
      onClose();
    } catch (err) {
      console.error("Error saving task", err);
    }

    // clear inputs after save
    setTitle("");
    setStatus("");
    setDescription("");
    setDate("");

    onClose();
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
        <DialogTitle className="bg-gradient-to-r from-blue-600 to-indigo-700 px-2 py-1 text-white">
          {editTaskdata ? "Edit Task 📊" : "Create Task 📊"}
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit} id="subscription-form">
            <div className="flex flex-col items-center justify-center gap-5 mt-5">
              <TextField
                autoFocus
                required
                margin="dense"
                id="name"
                name="title"
                label="Title"
                type="text"
                style={{ width: "50%" }}
                variant="standard"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <TextField
                required
                margin="dense"
                id="name"
                name="description"
                label="Description"
                type="text"
                style={{ width: "50%" }}
                variant="standard"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <TextField
                style={{ width: "50%" }}
                required
                margin="dense"
                id="name"
                name="date"
                type="date"
                variant="standard"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />

              <Select
                style={{ width: "50%" }}
                displayEmpty
                value={status}
                name="status"
                onChange={(e) => setStatus(e.target.value)}
              >
                <MenuItem value="" disabled>
                  Select Status
                </MenuItem>
                <MenuItem value="To Do">To Do</MenuItem>
                <MenuItem value="In Progress">In Progress</MenuItem>
                <MenuItem value="In Complete">In Complete</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
              </Select>
            </div>
          </form>
        </DialogContent>
        <DialogActions>
          <div className="flex justify-center items-center gap-5 mr-5">
            <button
              onClick={onClose}
              className="bg-transparent border border-gray-400 px-3 py-2 rounded text-red-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              form="subscription-form"
              className="bg-green-500 px-4 py-2"
            >
              {editTaskdata ? "Update" : "Save"}
            </button>
          </div>
        </DialogActions>
      </Dialog>
    </>
  );
}
