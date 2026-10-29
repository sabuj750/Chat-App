import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  const isOnline = onlineUsers.includes(selectedUser._id);

  return (
    <div className="relative px-4 py-3 border-b border-base-300 bg-base-100/80 backdrop-blur-md animate-fade-up">
      {/* subtle accent line */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="relative">
            <div
              className={`size-11 rounded-full p-0.5 transition-all duration-500 ${
                isOnline
                  ? "bg-gradient-to-br from-success to-primary"
                  : "bg-base-300"
              }`}
            >
              <img
                src={selectedUser.profilePic || "/avatar.png"}
                alt={selectedUser.fullName}
                className="size-full rounded-full object-cover border-2 border-base-100"
              />
            </div>
            {isOnline && (
              <span className="absolute bottom-0 right-0 flex size-3">
                <span className="animate-ping absolute inline-flex size-full rounded-full bg-success opacity-75" />
                <span className="relative inline-flex size-3 rounded-full bg-success ring-2 ring-base-100" />
              </span>
            )}
          </div>

          {/* User info */}
          <div>
            <h3 className="font-semibold leading-tight">{selectedUser.fullName}</h3>
            <p
              className={`text-xs flex items-center gap-1.5 transition-colors duration-300 ${
                isOnline ? "text-success" : "text-base-content/50"
              }`}
            >
              {isOnline ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        {/* Close button */}
        <button
          onClick={() => setSelectedUser(null)}
          aria-label="Close chat"
          className="btn btn-sm btn-circle btn-ghost hover:bg-error/10 hover:text-error
            hover:rotate-90 transition-all duration-300"
        >
          <X className="size-5" />
        </button>
      </div>
    </div>
  );
};
export default ChatHeader;