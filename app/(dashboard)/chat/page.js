import Chat from "@/components/Chat";
import { QueryClient, dehydrate } from "@tanstack/react-query";

const ChatPage = () => {
  const queryClient = new QueryClient();
  
  return (
    <>
      <Chat state={dehydrate(queryClient)} />
    </>
  );
};

export default ChatPage;
