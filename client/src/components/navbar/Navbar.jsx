import { useContext, useState } from 'react'
import './navbar.scss'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext';


export default function Navbar() {

  const [open, setOpen]= useState(false);

  const {currentUser} = useContext(AuthContext);


  return ( 
    <nav>
      <div className="left">
        <Link href="/" className='logo'>
          <img src="/logo.png" alt="" />
          <span>Stellar</span>
        </Link>
        <Link href="">Home</Link>
        <Link href="">About</Link>
        <Link href="">Contact</Link>
        <Link href="">Agents</Link>
      </div>
        <div className="right">
        {currentUser ? 
          (<div className='user'>
            <img src={currentUser.avatar || '/noavatar.png'} alt="" />
            <span>{currentUser.username}</span>
            <Link to="/profile" className="profile">
              <button className='profile-btn'>Profile</button>
            </Link>
          </div>) : 
            (<>
              <Link to="/login" className='login'>Sign in</Link>
              <Link to="/register" className='register'>Sign up</Link>
        </>)}
          <div className="menuIcon">
            <img 
              src="/menu.png" 
              alt="menu-icon" 
              onClick={()=>setOpen(!open)}
            />
          </div>
          <div className={open ? "menu active" : "menu"}>
            <Link href="">Home</Link>
            <Link href="">About</Link>
            <Link href="">Contact</Link>
            <Link href="">Agents</Link>
            <Link to="/login">Sign in</Link>
            <Link to='/register'>Sign up</Link>
          </div> 
        </div>
    </nav>
  )
}
