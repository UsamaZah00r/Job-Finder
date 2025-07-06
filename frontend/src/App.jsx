import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import { UserProvider } from "./context/UserContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // make sure this is included

export default function App() {
  return (
   
        <>
        <AppRouter />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          toastClassName="bg-blue-100 text-blue-700 border border-blue-400 rounded shadow-md"
          bodyClassName="text-sm font-medium"
          progressClassName="bg-blue-500"
        />
        </>
      
  );
}
