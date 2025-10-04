import { useContext, useState } from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { currentUser } = useContext(AuthContext);

  return (
    <nav>
      <div className="left">
        <Link to="/" className="logo">
          <img src="/logo.png" alt="logo" />
          <span>Stellar</span>
        </Link>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/agents">Agents</Link>
      </div>

      <div className="right">
        {currentUser ? (
          <div className="user">
            <img src={currentUser.avatar || "/noavatar.png"} alt="avatar" />
            <span>{currentUser.username}</span>
            <Link to="/profile" className="profile">
              <button className="profile-btn">Profile</button>
            </Link>
          </div>
        ) : (
          <div className="registration-links">
            <Link to="/register" className="register">
              Sign Up
            </Link>
            <Link to="/login" className="login">
              Sign in
            </Link>
          </div>
        )}

        <div className="menuIcon" onClick={() => setOpen(!open)}>
          <img src="/menu.png" alt="menu-icon" />
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              key="menu"
              className="menu"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 80, damping: 20 }}
            >
              <button className="closeBtn" onClick={() => setOpen(false)}>
                ✕
              </button>
              <Link to="/" onClick={() => setOpen(false)}>
                Home
              </Link>
              <Link to="/about" onClick={() => setOpen(false)}>
                About
              </Link>
              <Link to="/contact" onClick={() => setOpen(false)}>
                Contact
              </Link>
              <Link to="/agents" onClick={() => setOpen(false)}>
                Agents
              </Link>
              {!currentUser && (
                <>
                  <Link to="/login" onClick={() => setOpen(false)}>
                    Sign in
                  </Link>
                  <Link to="/register" onClick={() => setOpen(false)}>
                    Sign up
                  </Link>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
