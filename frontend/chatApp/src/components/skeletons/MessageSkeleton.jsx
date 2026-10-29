const MessageSkeleton = () => {
  // Create an array of 6 items for skeleton messages
  const skeletonMessages = Array(6).fill(null);

  return (
    <div className="flex-1 min-h-0 overflow-y-auto p-4 space-y-4 thin-scroll">
      {skeletonMessages.map((_, idx) => {
        const isStart = idx % 2 === 0;
        return (
          <div
            key={idx}
            className={`chat ${isStart ? "chat-start animate-msg-left" : "chat-end animate-msg-right"}`}
            style={{ animationDelay: `${idx * 90}ms` }}
          >
            <div className="chat-image avatar">
              <div className="size-10 rounded-full">
                <div className="skeleton w-full h-full rounded-full" />
              </div>
            </div>

            <div className="chat-header mb-1">
              <div className="skeleton h-3 w-14 rounded-full" />
            </div>

            <div className="chat-bubble bg-transparent p-0">
              <div
                className={`skeleton h-14 rounded-2xl ${
                  idx % 3 === 0 ? "w-[220px]" : idx % 3 === 1 ? "w-[160px]" : "w-[260px]"
                }`}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MessageSkeleton;