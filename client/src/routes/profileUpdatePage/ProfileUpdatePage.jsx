import React, { useContext, useState } from 'react'
import './profileUpdated.scss'
import { AuthContext } from '../../context/AuthContext'
import apiRequest  from '../../lib/apiRequest.js'
import { useNavigate } from "react-router-dom";

const ProfileUpdatePage = () => {

  const [error, setError] = useState('');

  const {currentUser, updateUser} = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const username = formData.get('username');
    const email = formData.get('email');
    const password = formData.get('password');

    try {
      const res = await apiRequest.put(`/users/${currentUser.id}`,{
        username, email, password
      });
      updateUser(res.data);
      navigate("/profile");
    } catch (error) {
        console.log(error);
        setError(error.response.data.message);
    }

  }

  return (
    <div className="profileUpdatePage">
    <div className="formContainer">
      <form onSubmit={handleSubmit}>
        <h1>Update Profile</h1>
        <div className="item">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            type="text"
            defaultValue={currentUser.username}
          />
        </div>
        <div className="item">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            defaultValue={currentUser.email}
          />
        </div>
        <div className="item">
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" />
        </div>
            <button>Update</button>
            {error && <span>{error}</span>}
      </form>
    </div>
    <div className="sideContainer">
      <img src={currentUser.avatar || '/noavatar.png'} alt="" className="avatar" />
      
    </div>
  </div>
  )
}

export default ProfileUpdatePage
