import { createContext,useState,useContext } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
 const SnackbarContext=createContext()
  export const useSnackbar= ()=>useContext(SnackbarContext)
export default function SnackbarProvider({ children}) {
    const [notify,setNotify]=useState({
      open:false,
      message:"",
      severity:"success",
    })
    const handleClose =()=>setNotify({...notify,open:false});
    
   
  return (
    <SnackbarContext.Provider value={setNotify}>
        {children}
    <Snackbar
      open={notify.open}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center", marginTop:"30px" }}
    >
      <Alert
        onClose={handleClose}
        severity={notify.severity || "success"}
        variant="filled"
        sx={{ width: "100%" }}
        
      >
        {notify.message}
      </Alert>
    </Snackbar>
    </SnackbarContext.Provider>
  );
}
