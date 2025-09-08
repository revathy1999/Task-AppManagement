import taskmanagement2 from "../assets/taskmanagement2.jpg";
import { useNavigate } from "react-router-dom";
import CreateTask from "./CreateTask";
import { useContext, useEffect, useState } from "react";
import ListTasks from "./LisTasks";
import axios from "axios";
import auth from "../config/firebase"
import { signOut } from "firebase/auth";
import { useSnackbar } from "../context/SnackbarProvider";
import axiosInstance from "../axios/axiosInstance";
export default function Home() {
  const [open, setOpen] = useState(false);
  const [task, setTask] = useState([]);
  const [editTaskdata, setEditTaskdata] = useState(null);
  const [admin,setAdmin]=useState(false)
  const navigate=useNavigate();
  const setNotify=useSnackbar()
// saving created tasks in Database
   useEffect(() => {
    axios
      .get("http://localhost:5000/tasks")
      .then((res) => {
        setTask(res.data);
      })
      .catch(() => console.log("Error retrieving tasks from DB"));
     
     
  }, []);
// Adding task 
  const addTask = (newTask) => {
    setTask((prev) => {
    const updatedTasks=[...prev, newTask]
    return updatedTasks;
  });
  };

  // Updating task
  const handleTaskUpdate = (Updatedtask, index) => {
    // prev gets previous task array before update
    // if current index i and updated index matches, it replace with updated task else old task t
    setTask((prev) => prev.map((t, i) => (i === index ? Updatedtask : t)));
  };

  // Edit task
  const editTask = (task, index) => {
    setEditTaskdata({ ...task, index }); //store clicked task and index
    setOpen(true);
  };

  // Delete task
 const deletetask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:5000/tasks/${taskId}`);
      setTask((prev) => {
       const updatedTasks= prev.filter((t) => t._id !== taskId); //t._id unique id from backend, keep only if its ID is not same as the one which we need to delete
        console.log("updatedtasks", updatedTasks);
        setNotify({
          open:true,
          message:"❌Task Deleted Successfully!",
          severity:"success"
        })
        return updatedTasks;
        
      });
    } catch (err) {
      console.error("Error deleting task", err);
    }
  };
  // Logout
  function logout(){
    signOut(auth);
    navigate("/login")
  }
  return (
    <>
    <nav className="flex justify-between bg-gradient-to-r from-blue-600 to-indigo-700
 px-5 py-3 text-white sticky top-0 z-10 Laptop:px-5">
      <h1 className="font-medium text-xl xs:text-sm ipad:text-2xl ipad-Pro:text-2xl Laptop:text-2xl">Task Management App</h1>
      <button className="text-white px-3 py-2 rounded xs:text-xs ipad:text-lg Laptop:text-lg" onClick={logout}>Logout</button>
    </nav>
      <div className="Laptop:flex Laptop:px-20 ipad:flex ipad:flex-row ipad-Pro:flex ipad-Pro:flex-row">
        <div>
          <img
            src={taskmanagement2}
            alt="taskmanagement"
            className="xs:w-[100%] ipad:w-[85%] ipad-Pro:w-[80%] Laptop:w-[80%]"
          />
        </div>
        <div className="flex flex-col gap-2 ipad:px-5 ipad-Pro:px-10">
          <div className="flex gap-2 mt-20 justify-center items-center">
            <h1 className="text-2xl font-bold text-black  md:mt-20  xs:text-xl ipad:text-xl ipad:mt-10 ipad-Pro:text-2xl Laptop:text-3xl">
             Manage  
            </h1>
            <h1 className="text-4xl font-bold text-black md:mt-20  xs:text-xl ipad:text-xl ipad:mt-10 ipad-Pro:text-2xl Laptop:text-3xl">
             your
            </h1>
            <h1 className="text-2xl font-bold text-black md:mt-20  xs:text-xl ipad:text-xl ipad:mt-10 ipad-Pro:text-2xl Laptop:text-3xl">
             Task
            </h1>
            <h1 className="text-2xl font-bold text-black md:mt-20  xs:text-xl ipad:text-xl ipad:mt-10 ipad-Pro:text-2xl Laptop:text-3xl">
             Effortlessly
            </h1>
          </div>
          <div className="flex flex-col justify-center items-center">
            <p className="mt-3 xs:text-sm ipad-Pro:text-[16px] Laptop:text-[18px]">
              Create, orangize and track your tasks with ease.
            </p>
             <button
              className="mt-5 bg-yellow-400 px-3 py-2 rounded font-medium hover:bg-yellow-200 transition-all duration-1000 xs:px-2 xs:py-2 xs:text-sm"
              onClick={() => setOpen(true)}
            >
              ➕ Add New Task
            </button> 
           
            <CreateTask
              open={open}
              onClose={() => setOpen(false)}
              addTask={addTask}
              setOpen={setOpen}
              editTaskdata={editTaskdata}
              onTaskUpdate={handleTaskUpdate}
            ></CreateTask>
          </div>
        </div>
      </div>
      <div>
        <ListTasks
          task={task}
          setTask={setTask}
          editTask={editTask}
          deletetask={deletetask}
          admin={admin}
          setAdmin={setAdmin}
        ></ListTasks>
      </div>
     
    </>
  );
}
