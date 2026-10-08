import { ChatProvider } from "../chat.context";
import Contactbar from "../Components/Contactbar";
import Conversation from "../Components/Conversation";

const Chat = () => {
  return (
    <ChatProvider>
    <div className="flex h-screen w-full overflow-hidden bg-background font-sans text-text-primary">
      <Contactbar />
      <Conversation />
    </div>
    </ChatProvider>
  );
};

export default Chat;
