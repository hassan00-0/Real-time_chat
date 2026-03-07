import { LogOut, MessageSquare, Settings, User } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const Navbar = () => {
  const { authUser, logout } = useAuthStore();
  return (
    <header className="fixed top-0 w-full z-40 bg-base-100/80 backdrop-blur-lg border-b border-base-300">
      <div className="container mx-auto h-16 px-4">
        <div className="flex items-center justify-between h-full">
          {/* logo */}
          <div className="">
            <Link
              to="/"
              className="flex items-center gap-2.5 hover:opacity-80 transition-all"
            >
              <div className="bg-primary/10 size-9 flex items-center justify-center rounded-lg">
                <MessageSquare className="size-5 text-primary" />
              </div>
              <h1 className="text-lg font-bold">ChatSphere</h1>
            </Link>
          </div>

          {/* links */}
          <div className="flex gap-8">
            <Link
              to="/settings"
              className="btn btn-sm flex items-center justify-center gap-2"
            >
              <Settings className="size-5" />
              <span className="hidden sm:inline">Settings</span>
            </Link>

            {authUser && (
              <>
                <Link
                  to="/profile"
                  className="btn btn-sm flex items-center justify-center gap-2"
                >
                  <User className="size-5" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>
                <button
                  onClick={logout}
                  className="cursor-pointer hover:bg-base-200 flex items-center justify-center gap-2 transition-colors"
                >
                  <LogOut className="size-5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
