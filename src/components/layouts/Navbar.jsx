import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Home,
  Calendar,
  MessageCircle,
  Info,
  User,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/api/userApi";
import { userLogout } from "@/redux/userSlice";
import toast from "react-hot-toast";

const Navbar = () => {
  const userData = useSelector((data) => data.user.userData);
  const [activeLink, setActiveLink] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dispatch = useDispatch();

  const navLinks = [
    {
      path: "/",
      label: "Find Events",
      icon: <Home className="mr-2 transition-all group-hover:rotate-6" />,
    },
    {
      path: "/dashboard",
      label: "Dashboard",
      icon: <Calendar className="mr-2 transition-all group-hover:rotate-6" />,
    },
    {
      path: "/contact",
      label: "Contact",
      icon: (
        <MessageCircle className="mr-2 transition-all group-hover:rotate-6" />
      ),
    },
    {
      path: "/about",
      label: "About",
      icon: <Info className="mr-2 transition-all group-hover:rotate-6" />,
    },
  ];

  const handleLogout = async () => {
    try {
      const response = await logout();
      if (response.data.status) {
        dispatch(userLogout());
        toast.success(response.data.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          <div className="flex items-center">
            <img
              src="/logo.png"
              alt="EventPro Logo"
              className="h-10 w-auto transform transition-transform hover:scale-105"
            />
          </div>

          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-600 hover:text-gray-800 focus:outline-none"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          <div className={`hidden md:flex space-x-4 items-center`}>
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`group flex items-center px-3 py-2 text-gray-600 hover:text-blue-600 rounded-lg transition-all duration-300 ${
                  activeLink === link.path ? "text-blue-600" : ""
                }`}
                onClick={() => setActiveLink(link.path)}
              >
                {link.icon}
                <span className="font-medium text-sm">{link.label}</span>
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center relative">
            {userData ? (
              <>
                <div className="flex items-center space-x-3 bg-gray-100 px-4 py-2 rounded-full cursor-pointer">
                  <User className="w-5 h-5 text-gray-600" />
                  <span className="font-semibold text-sm text-gray-800">
                    {userData.name}
                  </span>
                </div>  
                <div
                  className="flex text-gray-600 hover:text-red-600 py-2 cursor-pointer"
                  onClick={handleLogout}
                >
                  <LogOut className="mx-2" />
                  Logout
                </div>
              </>
            ) : (
              <Link
                to="/login"
                className="bg-blue-500 text-white font-semibold py-2 px-6 rounded-full hover:bg-blue-600 transition duration-300"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-100 px-4 py-4 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="flex text-gray-600 hover:text-blue-600 py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.icon}
              {link.label}
            </Link>
          ))}
          {userData ? (
            <div
              className="flex text-gray-600 hover:text-red-600 py-2 cursor-pointer"
              onClick={handleLogout}
            >
              <LogOut className="mr-2" />
              Logout
            </div>
          ) : (
            <Link
              to="/login"
              className="flex bg-blue-500 text-white font-semibold py-2 px-6 rounded-full text-center hover:bg-blue-600 transition duration-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
