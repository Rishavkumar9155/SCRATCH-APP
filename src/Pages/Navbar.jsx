import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="p-5 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 shadow-md">
      <div className="flex justify-between items-center w-full h-[5vh] text-white uppercase font-sans font-semibold">
        <div className="relative">
          <span className="text-2xl relative z-10">Scratch</span>
          <span className="absolute inset-0 z-0 w-full h-full -rotate-6 bg-white opacity-20 transform origin-left"></span>
        </div>
        <div className="flex space-x-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `relative px-4 py-2 transition duration-300 transform hover:scale-110 ${isActive ? 'active-nav' : ''}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/Paste"
            className={({ isActive }) =>
              `relative px-4 py-2 transition duration-300 transform hover:scale-110 ${isActive ? 'active-nav' : ''}`
            }
          >
            Paste
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
