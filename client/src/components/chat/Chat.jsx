import { useContext, useState } from "react";
import "./chat.scss";
import { useEffect } from "react";
import apiRequest from "../../lib/apiRequest";
import { AuthContext } from "../../context/AuthContext";
import ChatMessage from "./ChatMessage";


function Chat({ chatId, onClose }) {
  const { currentUser } = useContext(AuthContext);
  const [ messages, setMessages ] = useState([]);
  const [ newMessage, setNewMessage ] = useState("");
  const [ error, setError ] = useState("");
  const [chat, setChat] = useState(null);

useEffect(() => {
  const getData = async () => {
    try {
      const [messagesRes, chatRes] = await Promise.all([
        apiRequest.get(`/messages/${chatId}`),
        apiRequest.get(`/chats/${chatId}`),
      ]);

      setMessages(messagesRes.data);
      setChat(chatRes.data);
    } catch (error) {
      console.error(error);
      setError("Failed to load chat");
    }
  };

  if (chatId) getData();
}, [chatId]);

const otherUser = chat?.users?.find((u) => u.id !== currentUser?.id);

  const handleSend = async() => {
      if(!newMessage.trim()) return;

    try {
        const res = await apiRequest.post(`/messages/${chatId}`, {
        text: newMessage,
      });
      setMessages((prev) => [...prev, res.data]);
      setNewMessage("");
    } catch (error) {
      console.error(error);
      setError("Failed to send message");      
    }
  }

  return (
    <div className="chatModal">
      <div className="chatContent">
        <div className="top">
          <div className="user">
            <img
              src={otherUser?.avatar || "/noavatar.png"} alt="User Avatar"
            />
            {otherUser?.username || otherUser?.email || "User"}
          </div>
          <span className="close" onClick={onClose}>
            ✕
          </span>
        </div>
        <div className="center">
          {messages.length === 0 ? (
            <p className="empty">No messages yet.</p>
          ) : (
            messages.map((msg) => (
              <ChatMessage
                key={msg.id}
                message={msg}
                isOwn={msg.userId === currentUser?.id}
              />
            ))
          )}
        </div>
        <div className="bottom">
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
          />
          <button onClick={handleSend}>Send</button>
        </div>

        {error && <span className="error">{error}</span>}
      </div>
    </div>
  );
}

export default Chat