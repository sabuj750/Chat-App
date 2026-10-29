import React, { useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeletons from "./skeletons/SidebarSkeletons";
import { Users, Search, UserX } from "lucide-react";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUserLoading } =
    useChatStore();
  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const [query, setQuery] = useState("");

  React.useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = users
    .filter((user) => (showOnlineOnly ? onlineUsers.includes(user._id) : true))
    .filter((user) =>
      user.fullName?.toLowerCase().includes(query.trim().toLowerCase())
    );

  if (isUserLoading) {
    return <SidebarSkeletons />;
  }

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-300 bg-base-100">
      {/* Header */}
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2.5 justify-center lg:justify-start">
          <div className="size-9 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 ring-1 ring-primary/30 flex items-center justify-center">
            <Users className="size-5 text-primary" />
          </div>
          <span className="font-semibold hidden lg:block">Contacts</span>
          <span className="hidden lg:inline-flex ml-auto badge badge-primary badge-sm animate-pop">
            {users.length}
          </span>
        </div>

        {/* Search */}
        <label
          className="mt-4 hidden lg:flex items-center gap-2 px-3 h-9 rounded-full bg-base-200/70
            border border-transparent transition-all duration-300
            focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 focus-within:bg-base-100"
        >
          <Search className="size-4 text-base-content/50" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search contacts..."
            className="bg-transparent outline-none text-sm w-full"
          />
        </label>

        {/* Online filter */}
        <div className="mt-3 hidden lg:flex items-center justify-between">
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-sm checkbox-primary"
            />
            <span className="text-sm">Online only</span>
          </label>
          <span className="flex items-center gap-1.5 text-xs text-base-content/60">
            <span className="relative flex size-2">
              <span className="animate-ping absolute inline-flex size-full rounded-full bg-success opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-success" />
            </span>
            {Math.max(onlineUsers.length - 1, 0)} online
          </span>
        </div>
      </div>

      {/* Contact list */}
      <div className="overflow-y-auto w-full py-3 thin-scroll">
        {filteredUsers.map((user, i) => {
          const isOnline = onlineUsers.includes(user._id);
          const isSelected = selectedUser?._id === user._id;

          return (
            <button
              key={user._id}
              onClick={() => setSelectedUser(user)}
              style={{ animationDelay: `${Math.min(i, 12) * 40}ms` }}
              className={`
                animate-fade-in-left group relative w-full px-4 py-3 flex items-center gap-3
                transition-all duration-300 hover:bg-primary/5 hover:pl-5
                ${isSelected ? "bg-primary/10" : ""}
              `}
            >
              {/* Selected accent bar */}
              <span
                className={`absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-gradient-to-b from-primary to-secondary
                  transition-all duration-300 ${
                    isSelected ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0"
                  }`}
              />

              <div className="relative mx-auto lg:mx-0">
                <div
                  className={`size-12 rounded-full p-0.5 transition-all duration-300 group-hover:scale-105 ${
                    isOnline
                      ? "bg-gradient-to-br from-success to-primary"
                      : "bg-base-300"
                  }`}
                >
                  <img
                    src={user.profilePic || "/avatar.png"}
                    alt={user.fullName}
                    className="size-full object-cover rounded-full border-2 border-base-100"
                  />
                </div>
                {isOnline && (
                  <span className="absolute bottom-0 right-0 flex size-3">
                    <span className="animate-ping absolute inline-flex size-full rounded-full bg-success opacity-75" />
                    <span className="relative inline-flex size-3 rounded-full bg-success ring-2 ring-base-100" />
                  </span>
                )}
              </div>

              {/* User info - only visible on larger screens */}
              <div className="hidden lg:block text-left min-w-0">
                <div className="font-medium truncate">{user.fullName}</div>
                <div
                  className={`text-xs ${
                    isOnline ? "text-success" : "text-base-content/50"
                  }`}
                >
                  {isOnline ? "Online" : "Offline"}
                </div>
              </div>
            </button>
          );
        })}

        {filteredUsers.length === 0 && (
          <div className="hidden lg:flex flex-col items-center gap-2 text-center text-base-content/50 py-10 animate-fade-up">
            <UserX className="size-8" />
            <p className="text-sm">No contacts found</p>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;