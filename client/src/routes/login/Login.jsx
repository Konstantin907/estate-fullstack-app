import { useContext, useState } from "react";
import "./login.scss";
import { Link, useNavigate } from "react-router-dom";
import apiRequest from "../../lib/apiRequest.js";
import { AuthContext } from "../../context/AuthContext.jsx";

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
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Welcome back</h1>
          <input name="email" type="text" placeholder="Email" />
          <input name="password" required type="password" placeholder="Password" />
          <button disabled={isLoading}>Login</button>
          <Link to="/register">{"Don't"} you have an account?</Link>
          {error && <span>{error}</span>}
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Login;