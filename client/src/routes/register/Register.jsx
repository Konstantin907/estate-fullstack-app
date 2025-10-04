import './register.scss'
import { Link } from "react-router-dom";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import apiRequest from '../../lib/apiRequest.js';
import { motion } from 'framer-motion'

function Register() {

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate();

const handleSubmit = async(e) =>{
  e.preventDefault(); 
  setIsLoading(true);
  setError('')
  const formData = new FormData(e.target); 
  
  const username = formData.get('username')
  const email = formData.get('email')
  const password = formData.get('password')

  try {
    const res = await apiRequest.post("/auth/register",{
    username, email, password
  })

    navigate('/login');
  } catch (error) {
      console.log(error);
      setError(error.response.data.message)
  }finally{
    setIsLoading(false);
  }
  

}

  return (
    <div className="register">
      <motion.div 
      className="formContainer"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}>
        <form onSubmit={handleSubmit}>
          <h1>Create an Account</h1>
          <input name="username" type="text" placeholder="Username" />
          <input name="email" type="text" placeholder="Email" />
          <input name="password" type="password" placeholder="Password" />
          <button disabled={isLoading}>Register</button>
          <Link to="/login">Do you have an account?</Link>
          {error && <span>{error}</span>}
        </form>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="imgContainer"
      >
        <img src="/bg.png" alt="" />
      </motion.div>
    </div>
  );
}

export default Register;