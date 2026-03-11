import { MessageSquare } from "lucide-react";
import React from "react";

const NoChatSelected = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center p-16 bg-base-100/50">
      <div className="max-w-md text-center space-y-6">
        {/* icon display */}
        <div className="flex justify-center mb-4">
          <div className="relative">
            <div className="size-16 bg-primary/10 rounded-2xl flex items-center justify-center animate-bounce">
              <MessageSquare className="size-8 text-primary" />
            </div>
          </div>
        </div>

        {/* text */}
        <h2 className="text-2xl font-bold">Welcome to Chatty!</h2>
        <p className="text-base-content/60">
          Select a conversation from the sidebar to start chatting
        </p>
      </div>
    </div>
  );
};

export default NoChatSelected;
