import React, { useEffect, useRef } from "react";
import { MessageCircleHeart } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils.js";

const ChatContainer = () => {
  const {
    selectedUser,
    getMessages,
    messages,
    isMessagesLoading,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();

  const { authUser } = useAuthStore();
  const scrollRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);
    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  // Scroll to the bottom whenever messages change
  useEffect(() => {
    // Scroll only the message list (scrollIntoView would also scroll the page/ancestors)
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col min-w-0 min-h-0 overflow-hidden">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col min-w-0 min-h-0 overflow-hidden">
      <ChatHeader />

      <div
        ref={scrollRef}
        className="flex-1 min-h-0 overflow-y-auto p-4 space-y-4 thin-scroll bg-gradient-to-b from-base-100 to-base-200/40"
      >
        {/* Empty state */}
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center gap-3 animate-fade-up">
            <div className="animate-float size-16 rounded-2xl bg-primary/10 flex items-center justify-center">
              <MessageCircleHeart className="size-8 text-primary" />
            </div>
            <p className="font-semibold">No messages yet</p>
            <p className="text-sm text-base-content/60">
              Say hi to {selectedUser.fullName} 👋
            </p>
          </div>
        )}

        {messages.map((message) => {
          const isMine = message.senderId === authUser._id;

          return (
            <div
              key={message._id}
              className={`chat ${isMine ? "chat-end animate-msg-right" : "chat-start animate-msg-left"}`}
            >
              <div className="chat-image avatar">
                <div className="size-10 rounded-full ring-2 ring-base-300 hover:ring-primary transition-all duration-300">
                  <img
                    src={
                      isMine
                        ? authUser.profilePic || "/avatar.png"
                        : selectedUser.profilePic || "/avatar.png"
                    }
                    alt="profile pic"
                  />
                </div>
              </div>

              <div className="chat-header mb-1">
                <time className="text-xs opacity-50 ml-1">
                  {formatMessageTime(message.createdAt)}
                </time>
              </div>

              <div
                className={`chat-bubble flex flex-col shadow-md transition-transform duration-200 hover:scale-[1.02] ${
                  isMine
                    ? "bg-gradient-to-br from-primary to-secondary text-primary-content"
                    : "bg-base-300 text-base-content"
                }`}
              >
                {message.image && (
                  <div className="overflow-hidden rounded-lg mb-2">
                    <img
                      src={message.image}
                      alt="Attachment"
                      className="sm:max-w-[220px] rounded-lg transition-transform duration-500 hover:scale-110 cursor-zoom-in"
                    />
                  </div>
                )}
                {message.text && <p className="break-words">{message.text}</p>}
              </div>
            </div>
          );
        })}
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatContainer;