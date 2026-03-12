import React, { useEffect } from "react";
import { useChatStore } from "../store/useChatStore.js";
import { useAuthStore } from "../store/useAuthStore.js";
import { Users } from "lucide-react";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } =
    useChatStore();

  const { onlineUsers } = useAuthStore();
  useEffect(() => {
    getUsers();
  }, [getUsers]);

  if (isUsersLoading) return <SidebarSkeleton />;
  return (
    <aside className="h-full w-24 lg:w-80 border-r border-base-300 flex flex-col transition-all duration-200">
      {/* header */}
      <div className="border-b border-base-300 w-full p-5 flex items-center gap-2">
        <Users className="size-5" />
        <span className="hidden lg:block font-medium">Contacts</span>
      </div>

      {/* todo: online filter toggle */}

      <div className="overflow-y-auto w-full py-3 flex flex-col">
        {users.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`w-full p-3 flex justify-center lg:justify-start items-center gap-3 hover:bg-base-300 
            transition-colors rounded-xl ${selectedUser?._id === user._id ? "bg-base-300 ring-1 ring-base-300" : ""}  `}
          >
            {/* user image */}
            <div className="relative mx-auto lg:mx-0 shrink-0 ">
              <img
                src={user.profilePic || "/avatar.png"}
                alt={user.name}
                className="size-12 rounded-full object-cover"
              />
              {/* green dot for online status*/}
              {onlineUsers.includes(user._id) && (
                <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-zinc-900"></span>
              )}
            </div>

            {/* user info */}
            <div className="hidden lg:block text-left min-w-0 ">
              <div className="font-medium truncate">{user.fullName}</div>
              <div className="text-sm text-zinc-400">
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
