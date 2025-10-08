import Chat from "../../components/chat/Chat";
import List from "../../components/list/List";
import apiRequest from "../../lib/apiRequest.js";
import { Await, useLoaderData, useNavigate } from 'react-router-dom';
import "./profile.scss";
import { Suspense, useContext, useState } from "react";
import { AuthContext } from '../../context/AuthContext';
import { Link } from 'react-router-dom'
import { useEffect } from "react";
import { motion } from 'framer-motion'

  // framer:
  const fadeIn = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y:0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  const slideInRight = {
    hidden: { opacity: 0, x:100 },
    visible: { opacity: 1, x:0, transition: { duration: 0.7, ease: "easeOut" } },
  }


function ProfilePage() {
  const data = useLoaderData();
  const navigate = useNavigate();
  
  const { currentUser, updateUser } = useContext(AuthContext)

  const [selectedChatId, setSelectedChatId] = useState(null);
  const [chats, setChats] = useState([]);

// chat get:
useEffect(()=> {
  const getChats = async() => {
    try {
      const res = await apiRequest.get("/chats");
      setChats(res.data);
      
    } catch (error) {
        console.error(error);
    }
  }
  getChats();
},[])

const handleLogout = async() =>{
  try {
    await apiRequest.post('/auth/logout');
    updateUser(null);
    navigate('/');
  } catch (error) {
    console.log(error);
  }

}
  return (
    <div className="profilePage">
      <div className="userInfo">
        <motion.div 
        className="textUser"
        variants={slideInRight}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Welcome in, {currentUser.username.charAt(0).toUpperCase() + currentUser.username.slice(1)}!
        </motion.div>
        <motion.div
          className="profileCard"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="cardImageWrapper">
            <img
              src={currentUser.avatar || "./noavatar.png"}
              alt="avatarImg"
              className="cardImage"
            />
            <div className="cardOverlay">
              <div className="cardInfo">
                <h2>{currentUser.username}</h2>
                <p>{currentUser.email}</p>
              </div>
              <div className="imageBtn">
              <Link to="/profile/update">
                <button className="updateBtn">Update Profile</button>
              </Link>
              <Link>
                <button onClick={()=>handleLogout()} className="logoutBtn">Logout</button>
              </Link>
              </div>

            </div>
          </div>
        </motion.div>
            {/* Saved Posts Section */}
        <div className="savedPosts">
          <h2 className="savedHeading">Saved Posts</h2>
          <Suspense fallback={<p>Loading...</p>}>
            <Await
              resolve={data.postResponse}
              errorElement={<p>Error loading posts!</p>}
            >
              {(postResponse) => <List posts={postResponse.data.savedPosts} />}
            </Await>
          </Suspense>
        </div>
      </div>
      <motion.div 
          className="chatContainer"
          variants={slideInRight}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="wrapper">
          {!selectedChatId ? (
            <div>
              <h2>Your Chats :</h2>
              {chats.length === 0 ? (
                <p>No chats yet.</p>
              ) : (
                chats.map((chat) => (
                  <div
                    key={chat.id}
                    onClick={() => setSelectedChatId(chat.id)}
                    className="chatItem"
                  >
                    <img
                      src={chat.otherUser?.avatar || "/noavatar.png"}
                      alt=""
                      className="chatAvatar"
                    />
                    <span>
                      {chat.otherUser?.username ||
                        chat.otherUser?.email ||
                        "User"}
                    </span>
                  </div>
                ))
              )}
            </div>
          ) : (
            <Chat
              chatId={selectedChatId}
              onClose={() => setSelectedChatId(null)}
            />
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default ProfilePage;
