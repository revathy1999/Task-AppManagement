import { useEffect, useState } from "react";
import deleteIcon from "../assets/deleteIcon.png";
import notes from "../assets/notes.png";
import axios from "axios";
import auth from "../config/firebase"
import { useSnackbar } from "../context/SnackbarProvider";
import axiosInstance from "../axios/axiosInstance";
export default function ListTasks({ task, editTask, deletetask, setTask, admin, setAdmin }) {
  const [search, setSearch] = useState("");
  const [debouncedSearch,setDebounceSearch]=useState("")
  const setNotify=useSnackbar()
 
  // Debounce used to limit the frequency of execution of function
  useEffect(()=>{
    const handler = setTimeout(()=>{
      setDebounceSearch(search)
    },500)
    // cleanup timer when user types again
    return ()=>clearTimeout(handler)
  },[search])
  const filtertasks = task.filter(function (t) {
    // Format date into a readable string for searching
  const taskDate = new Date(t.date).toLocaleDateString("en-GB"); 
    return (
      t.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      t.description.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      t.status.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      taskDate.includes(debouncedSearch.toLowerCase())
    );
  });
  // Status Summary 
  const todo = task.filter((t) => t.status === "To Do").length;
  const inprogress = task.filter((t) => t.status === "In Progress").length;
  const completed = task.filter((t) => t.status === "Completed").length;
  const pinned = task.filter((t) => t.pinned).length;
  // Pining task
  const togglePinTask = async (taskId) => {
    try {
      // send req to backend to update task pinned status
const res = await axios.put(`http://localhost:5000/tasks/${taskId}/pin`);      // backend responds with updated task whether pinned is true/false
      const updatedTask = res.data.pintask;
      console.log("updated ", updatedTask);
      //  update the state, taskid matches with updatedtask_id one, replace it with updatedTask
      const updatedPintask = setTask((prev) =>
        prev.map((t) => (t._id === updatedTask._id ? updatedTask : t))
      );
      setNotify({
      open:true,
      message:updatedTask.pinned ? "📌Task Pinned Successfully!": "Task UnPinned Sucessfully",
      severity:"success"
    })
      return updatedPintask;
      
    } catch (err) {
      console.error("Error Pinning task", err);
     
    }
    
  };
  return (
    <>
      <div className="mt-20">
        <h1 className="font-medium text-3xl xs:text-xl xs:text-center ipad:text-2xl">
          Here's What you're Working On
        </h1>
      </div>
      <div className="flex justify-center items-center mt-10">
        <input
          type="search"
          className="border border-gray-400 px-3 py-3 w-[60%] rounded-xl focus:border-none"
          placeholder="Search tasks.."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="bg-white shadow-md rounded-lg p-4 mt-5 mb-6 flex flex-wrap justify-around text-center gap-4">
        <div className="flex flex-col items-center">
          <span className="text-xl font-bold text-blue-600">{todo}</span>
          <span className="text-sm text-gray-500">➕ To Do</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-xl font-bold text-yellow-500">
            {inprogress}
          </span>
          <span className="text-sm text-gray-500">🔃 In Progress</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-xl font-bold text-green-600">{completed}</span>
          <span className="text-sm text-gray-500">✅ Completed</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-xl font-bold text-purple-600">{pinned}</span>
          <span className="text-sm text-gray-500">📌 Pinned</span>
        </div>
      </div>
      <div className="mt-10 grid grid-cols-3 gap-10 px-10 items-center xs:text-sm tablet-mini:grid tablet-mini:grid-cols-1 ipad:text-lg ipad:grid ipad:grid-cols-1 Laptop:text-lg">
        {/* !task check if task is undefined or null */}
        {!task || task.length === 0
          ? "No task yet. Click Add task to get started!"
          : filtertasks.map(function (items, index) {
              return (
                <div
                  className={`bg-green-100 rounded shadow-md mb-5 px-8 py-5 flex flex-col gap-3 ${
                    items.pinned ? "bg-yellow-100" : " bg-green-100"
                  }`}
                  key={index}
                >
                   <div className="flex gap-5 justify-end">
                    {/* pin task */}
                    <button
                      onClick={() => togglePinTask(items._id)}
                      className="Laptop:px-2 Laptop:py-1 text-black bg-green-300 rounded xs:px-1 xs:py-1 xs:text-xs"
                    >
                      {items.pinned ? "📌Unpin Task" : "📍Pin Task"}
                    </button>

                    {/* Edit Task */}
                    <button title="edit" onClick={() => editTask(items, index)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 xs:w-5"
                      >
                        <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                        <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                      </svg>
                    </button>
                    {/* Delete Task */}
                    <button
                      title="delete"
                      onClick={() => deletetask(items._id)}
                    >
                      <img
                        src={deleteIcon}
                        alt="deleteIcon"
                        className="w-6 xs:w-5"
                      />
                    </button>
                  </div>
                  

                  <p className="font-medium text-xl">Task {index + 1}</p>
                  <p>
                    <span className="font-medium">Task Name:&nbsp;&nbsp;</span>
                    {items.title}
                  </p>
                  <p>
                    <span className="font-medium">
                      Task Description:&nbsp;&nbsp;
                    </span>
                    {items.description}
                  </p>
                  <p>
                    <span className="font-medium">Due Date:&nbsp;&nbsp;</span>{" "}
                    {items.date}
                  </p>
                  <p>
                    <span className="font-medium">Status:&nbsp;&nbsp;</span>{" "}
                    <span
                      className={`px-2 py-1 text-white rounded font-medium 
                    ${items.status === "To Do" ? "bg-yellow-400" : ""}
                    ${items.status === "In Progress" ? "bg-blue-400" : ""}
                    ${items.status === "In Complete" ? "bg-red-400" : ""}
                    ${items.status === "Completed" ? "bg-green-600" : ""}`}
                    >
                      {" "}
                      {items.status}{" "}
                    </span>
                  </p>
                </div>
              );
            })}
      </div>
    </>
  );
}
