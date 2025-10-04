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
  <div className='register-container'>
   <motion.div 
      className="form-container"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <p className="title">Create an Account</p>
      
      <form className="form" onSubmit={handleSubmit}>
        <input type="username" name="username" className="input" placeholder="Username" required />
        <input type="email" name="email" className="input" placeholder="Email" required />
        <input type="password" name="password" className="input" placeholder="Password" required />
        
        <p className="page-link">
          <span className="page-link-label">Forgot Password?</span>
        </p>

        <button className="form-btn" disabled={isLoading}>
          {isLoading ? "Loading..." : "Register"}
        </button>
      </form>

      {error && <span className="error-text">{error}</span>}

      <p className="sign-up-label">
        Already have an account? 
        <Link to="/login" className="sign-up-link"> Sign in</Link>
      </p>
    </motion.div>
    </div>
  );
}

export default Register;