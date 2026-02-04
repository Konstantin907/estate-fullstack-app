import './noChat.scss'
import { MessageCircle } from 'lucide-react';


const NoChatYet = () => {
  return (
    <div className='noChatContainer'>
      <MessageCircle />
      <h2>No chats yet</h2>
      <p>Start a conversation with someone to get started</p>
    </div>
  )
}

export default NoChatYet
