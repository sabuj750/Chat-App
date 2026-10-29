import React from "react";
import { useChatStore } from "../store/useChatStore";
import Sidebar from "../components/Sidebar";
import ChatContainer from "../components/ChatContainer";
import NoChatSelected from "../components/NoChatSelected";

const HomePage = () => {
  const { selectedUser } = useChatStore();
  return (
    <div className="relative h-screen bg-base-200 overflow-hidden">
      {/* ambient background glow */}
      <div className="animate-blob pointer-events-none absolute -top-32 -left-32 size-[28rem] rounded-full bg-primary/10 blur-3xl" />
      <div
        className="animate-blob pointer-events-none absolute -bottom-40 -right-32 size-[30rem] rounded-full bg-secondary/10 blur-3xl"
        style={{ animationDelay: "-6s" }}
      />

      <div className="relative flex items-center justify-center pt-20 px-4">
        <div className="animate-fade-up bg-base-100 rounded-2xl border border-base-300 shadow-2xl shadow-primary/10 w-full max-w-6xl h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded-2xl overflow-hidden">
            <Sidebar />

            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;