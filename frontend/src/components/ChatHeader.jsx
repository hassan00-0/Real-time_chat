import React from "react";
import { useChatStore } from "../store/useChatStore.js";
import { useAuthStore } from "../store/useAuthStore.js";

const ChatHeader = () => {
  const { selectedUsers, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();
  return <div className="border-b bg-base-300 p-4 w-screen">ChatHeader </div>;
};

export default ChatHeader;
