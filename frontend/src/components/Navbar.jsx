import React from "react";
import { Link } from "react-router-dom";
import { PlusIcon, LogOutIcon } from "lucide-react";
import { useCookies } from "react-cookie";

const Navbar = ({ username }) => {
  const [, , removeCookie] = useCookies(["token"]);

  const handleLogout = () => {
    removeCookie("token", { path: "/" }); 
    window.location.href = "/login"; 
  };

  return (
    <header className="bg-base-300 border-b border-base-content/10">
      <div className="mx-auto max-w-6xl p-4 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-primary font-mono tracking-tighter">
          QuestBoard
        </h1>
        <div className="flex items-center gap-4">
          <span className="hidden md:block text-gray-700">Hello, {username}</span>
          <Link to="/create" className="btn btn-primary flex items-center gap-1">
            <PlusIcon className="w-5 h-5" />
            New Quest
          </Link>
          <button
            onClick={handleLogout}
            className="btn btn-secondary flex items-center gap-1"
          >
            <LogOutIcon className="w-5 h-5" />
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
