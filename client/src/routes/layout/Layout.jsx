import React, { useContext } from 'react'
import "./layout.scss"
import Navbar from '../../components/navbar/Navbar'
import HomePage from '../homePage/homePage'
import { Outlet } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { Navigate } from "react-router-dom";


const Layout = () => {
  return (
    <div className="layout">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}


function RequireAuth() {
  const { currentUser } = useContext(AuthContext);

  if (!currentUser) return <Navigate to="/login" />;
  else {
    return (
      <div className="layout">
        
        <div className="content">
          <Outlet />
        </div>
      </div>
    );
  }
}

export {Layout, RequireAuth};
