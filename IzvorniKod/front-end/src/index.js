import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import SignIn from './SignIn';
import Register from './Register'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import AdminPanel from './AdminPanel';
const baseName='https://planbot-9s64.onrender.com'
const router=createBrowserRouter([
  {
    path:"",
    element:<SignIn/>
  },
  {
    path:"SignIn",
    element:<SignIn/>
  },
  {
    path:"Register",
    element:<Register/>
  },
  {
    path:"AdminPanel",
    element:<AdminPanel/>
  }
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} basename={baseName}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
