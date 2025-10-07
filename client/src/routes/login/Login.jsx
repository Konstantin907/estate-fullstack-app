import { useContext, useState } from "react";
import "./login.scss";
import { Link, useNavigate } from "react-router-dom";
import apiRequest from "../../lib/apiRequest.js";
import { AuthContext } from "../../context/AuthContext.jsx";
import { motion } from 'framer-motion'

function Login() {

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate()
  
  const {updateUser} = useContext(AuthContext)

  const handleSubmit = async(e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    const formData = new FormData(e.target);

    const email = formData.get('email');
    const password = formData.get('password');

    try {
      const res = await apiRequest.post('/auth/login',{
        email, password,
      }); 
      updateUser(res.data);
      navigate('/')
      
    } catch (error) {
        setError(error.response.data.message)
    }finally{
      setIsLoading(false);
    }
  } 


  return (
    <div className="login">
      <motion.div
        className="formContainer"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.form
          onSubmit={handleSubmit}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
        >
          <motion.h1
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Welcome back
          </motion.h1>

          <motion.input
            whileFocus={{ scale: 1.03, borderColor: "#0077ff" }}
            transition={{ type: "spring", stiffness: 250 }}
            name="email"
            type="text"
            placeholder="Email"
          />
          <motion.input
            whileFocus={{ scale: 1.03, borderColor: "#0077ff" }}
            transition={{ type: "spring", stiffness: 250 }}
            name="password"
            required
            type="password"
            placeholder="Password"
          />
          <motion.button
            disabled={isLoading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {isLoading ? "Loading..." : "Login"}
          </motion.button>
          <Link to="/register">{"Don't"} you have an account? Register</Link>
          {error && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{error}</motion.span>}
        </motion.form>
      </motion.div>

      <motion.div
        className="imgContainer"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <motion.img
          src="/bg.png"
          alt=""
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 200 }}
        />
      </motion.div>
    </div>
  );
}

export default Login;