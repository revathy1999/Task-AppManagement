import { useState } from "react";
import "./App.css";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SnackbarProvider from "./context/SnackbarProvider";

function App() {
  return (
    <>
      <BrowserRouter>
      <SnackbarProvider>
        <Routes>
          <Route path="/" element={<SignUp />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/home" element={<Home />}></Route>
        </Routes>
        </SnackbarProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
