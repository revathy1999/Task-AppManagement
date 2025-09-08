import featureimage_taskmanagement from "../assets/featureimage_taskmanagement.png"
import { useNavigate } from "react-router-dom"
import auth from "../config/firebase"
import { useEffect, useState } from "react"
import { signInWithEmailAndPassword } from "firebase/auth"
import { onAuthStateChanged } from "firebase/auth"
export default function Login(){
    const navigate=useNavigate()
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const[error,setErrors]=useState("")
    useEffect(()=>{
auth.onAuthStateChanged(function(user){
    if(user){
        navigate("/home")
    }
})
    },[])
    // Login 
    function Login(e){
        e.preventDefault();
        signInWithEmailAndPassword(auth,email,password).then(()=>{
            navigate("/home")
        })
        .catch(()=>{
            console.log("Login Failed")
            setErrors("Login Failed, Enter valid Credentials")
             // if any errors reset input values
            setEmail("")
            setPassword("")
    })
   
    }
    return <>
    <nav className="flex justify-between bg-gradient-to-r from-blue-600 to-indigo-700
 px-5 py-3 text-white sticky top-0 z-10 Laptop:px-5">
      <h1 className="font-medium text-xl xs:text-sm ipad:text-2xl ipad-Pro:text-2xl Laptop:text-2xl">Task Management App</h1>
    </nav>
     <div className="ipad:flex ipad:flex-col ipad:gap-3 ipad:mb-5 ipad-Pro:flex ipad-Pro:mt-48 ipad-Pro:gap-3 ipad-Pro:px-10 Laptop:flex Laptop:px-5 Laptop:py-28">
            <div>
    <img src={featureimage_taskmanagement} alt="taskApp_image" className="xs:mt-10 shadow-lg ipad-Pro:w-[85%] Laptop:w-[85%]" />
            </div>
            <form onSubmit={Login}>
            <div className="flex flex-col gap-10 justify-center items-center xs:mt-10 ipad:shadow-md ipad:px-5 ipad:py-9 ipad-Pro:mt-18 ipad-Pro:text-sm Laptop:px-28">
                <h1 className="font-bold text-3xl mb-4 ipad-Pro:text-2xl">Login</h1>
                <input type="email" placeholder=" Email ID" value={email} onChange={(e)=>setEmail(e.target.value)} className="border-b-2 border-gray-300 focus:border-blue-400 outline-none w-64" required/>
                <input type="password" placeholder=" Password" value={password} onChange={(e)=>setPassword(e.target.value)} className="border-b-2 border-gray-300 focus:border-blue-400 outline-none w-64" required/>
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                <button className="bg-blue-400 px-4 py-2 text-white rounded">Login</button>
                <span>Don't have an account? <span className="text-blue-400 underline cursor-pointer" onClick={()=>navigate("/signup")}>Signup here</span> </span>
            </div>
            </form>
        </div>
    </>
}