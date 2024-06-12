import { useState } from 'react'
import './navbar.scss'
import { Link } from 'react-router-dom'


export default function Navbar() {

  const [open, setOpen]= useState(false);
  const user = false;

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
        {user? 
          (<div className='user'>
            <img src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" />
            <span>Joe Doe</span>
            <Link to={'/profile'}>
              <div className="notification">
                3
              </div>
              <span>Profile</span>
            </Link>
          </div>) : 
            (<><a href="">Sign in</a>
        <a href="" className='register'>Sign up</a></>)}
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
            <Link href="">Sign in</Link>
            <Link href="">Sign up</Link>
          </div> 
        </div>
    </nav>
  )
}
