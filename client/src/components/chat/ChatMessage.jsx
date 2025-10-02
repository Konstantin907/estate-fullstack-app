import { format } from "date-fns";
import './chatMessage.scss'

function ChatMessage({ message, isOwn }) {
  return (
    <div className={`message ${isOwn ? "own" : "other"}`}>
      {!isOwn && (
        <img src={message.user?.avatar || "/noavatar.png"} alt="avatar" />
      )}
      <div className="bubble">
        <p>{message.text}</p>
        <span className="meta">
          {format(new Date(message.createdAt), "HH:mm")}
        </span>
      </div>
      {isOwn && (
        <img src={message.user?.avatar || "/noavatar.png"} alt="avatar" />
      )}
    </div>
  );
}

export default ChatMessage;
