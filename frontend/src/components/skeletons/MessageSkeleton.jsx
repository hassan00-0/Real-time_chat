const MessageSkeleton = () => {
  // 6 empty things in the array
  const SkeletonMessages = Array(6).fill(null);

  return (
    <div className="flex-1 space-y-4 overflow-y-auto p-4">
      {SkeletonMessages.map((_, idx) => (
        <div
          key={idx}
          className={`chat ${idx % 2 === 0 ? "chat-start" : "chat-end"}`}
        >
          {/* image placeholder */}
          <div className="avatar chat-image">
            <div className="size-10 rounded-full skeleton" />
          </div>

          {/* header placeholder */}
          <div className="chat-header mb-1">
            <div className="skeleton h-4 w-16" />
          </div>

          {/* content placeholder */}

          <div className="chat-bubble bg-transparent p-0">
            <div className="skeleton w-50 h-16" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageSkeleton;
