import Chat from "../../components/chat/Chat";
import List from "../../components/list/List";
import apiRequest from "../../lib/apiRequest.js";
import { Await, useLoaderData, useNavigate } from 'react-router-dom';
import "./profile.scss";
import { Suspense, useContext, useState } from "react";
import { AuthContext } from '../../context/AuthContext';
import { Link } from 'react-router-dom'
import { useEffect } from "react";


function ProfilePage() {
  const data = useLoaderData();
  const navigate = useNavigate() 
  
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
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>User Information</h1>
            <Link to="/profile/update">
              <button>Update Profile</button>
            </Link>
          </div>
          <div className="info">
            <span>
              Avatar:
              <img src={currentUser.avatar || "/noavatar.png"} alt="" />
            </span>
            <span>
              Username: <b>{currentUser.username}</b>
            </span>
            <span>
              E-mail: <b>{currentUser.email}</b>
            </span>
            <button onClick={handleLogout}>Logout</button>
          </div>
          <div className="title">
            <h1>My List</h1>
            <Link to="/add">
              <button>Create New Post</button>
            </Link>
          </div>
          <Suspense fallback={<p>Loading...</p>}>
            <Await
              resolve={data.postResponse}
              errorElement={<p>Error loading posts!</p>}
            >
              {(postResponse) => <List posts={postResponse.data.userPosts} />}
            </Await>
          </Suspense>

          <div className="title">
            <h1>Saved List</h1>
          </div>
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
      {/* CHAT */}
      <div className="chatContainer">
        <div className="wrapper">
          {!selectedChatId ? (
            <div>
              <h2>Your Chats</h2>
              {chats.length === 0 ? (
                <p>No chats yet.</p>
              ) : (
                chats.map((chat) => (
                  <div
                    key={chat.id}
                    onClick={() => setSelectedChatId(chat.id)}
                    style={{ cursor: "pointer", marginBottom: "8px" }}
                  >
                    <img
                      src={chat.otherUser?.avatar || "/noavatar.png"}
                      alt=""
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                        marginRight: "8px",
                      }}
                    />
                  <span>{chat.otherUser?.username || chat.otherUser?.email || "User"}</span>

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
      </div>
    </div>
  );
}

export default ProfilePage;
