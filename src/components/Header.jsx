import useCartStore from "../store/useCartStore";
import useAuthStore from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import logo from "../assets/quadros_logo1.jpg";

import { ShoppingCart, User2, Menu, X } from "lucide-react";

const OrderHeader = () => {
  const cart = useCartStore((state) => state.cart);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigate = useNavigate();

  return (
    <>
      <header className="fixed top-0 left-0 z-50 w-full h-20 lg:h-35 border-b-4 border-green-900 bg-green-950">
        <div className="container flex items-center justify-between h-full px-2 lg:px-4 py-2 mx-auto">
          {/* Left section - Logo */}
          <div
            onClick={() => navigate("/")}
            className="flex justify-center items-center space-x-2 px-2 py-2 hover:cursor-pointer duration-200 hover:bg-green-600 rounded"
          >
            <img
              className="rounded-full w-12 h-12 lg:w-20 lg:h-20 xl:w-30 xl:h-30"
              src={logo}
              alt="Logo"
            />
            <p className="text-base sm:text-lg lg:text-xl xl:text-4xl font-bold text-white whitespace-nowrap">
              QUADROS PIZZA
            </p>
          </div>

          {/* Desktop Navigation - Hidden on mobile */}
          <div className="hidden lg:flex items-center p-2 h-full font-bold text-sm lg:text-base xl:text-2xl">
            <div 
              className="px-4 lg:px-6 xl:px-8 h-full content-center cursor-pointer duration-200 hover:bg-green-600 text-white rounded"
              onClick={() => navigate("products")}
            >
              MENUS
            </div>
            <div 
              className="px-4 lg:px-6 xl:px-8 h-full content-center cursor-pointer duration-200 hover:bg-green-600 text-white rounded"
              onClick={() => navigate("about")}
            >
              ABOUT US
            </div>
            <div 
              className="px-4 lg:px-6 xl:px-8 h-full content-center cursor-pointer duration-200 hover:bg-green-600 text-white rounded"
              onClick={() => navigate("contacts")}
            >
              CONTACTS
            </div>
          </div>

          {/* Right section */}
          <div className="flex items-center text-red-900">
            {/* Desktop Actions */}
            <div className="hidden sm:flex items-center bg-white rounded-full">
              <div className="flex items-center p-3 lg:p-4 xl:p-5 space-x-3">
                <div
                  onClick={() => navigate("cart")}
                  className="relative hover:cursor-pointer"
                >
                  <ShoppingCart size={24} className="lg:w-8 lg:h-8 xl:w-8 xl:h-8" />
                  <span className="absolute px-1.5 lg:px-2 font-bold text-white bg-red-400 rounded-full -top-2 lg:-top-3 -right-2 lg:-right-3 text-xs lg:text-sm">
                    {cart.length}
                  </span>
                </div>
              </div>
              
              {isAuthenticated ? (
                <User2
                  className="hover:cursor-pointer text-green-950 w-6 h-6 lg:w-8 lg:h-8 xl:w-8 xl:h-8 mx-3 mr-5"
                  onClick={() => navigate("profile")}
                />
              ) : (
                <div className="mx-3">
                  <button
                    onClick={() => navigate("login")}
                    className="px-3 py-1.5 lg:px-4 lg:py-2 font-bold text-white text-sm lg:text-base transition duration-200 bg-blue-500 rounded-full hover:bg-blue-600 whitespace-nowrap"
                  >
                    Login
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-white hover:bg-green-600 rounded"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Mobile Actions - Visible on small screens */}
            <div className="flex sm:hidden items-center space-x-2 ml-2">
              <div
                onClick={() => navigate("cart")}
                className="relative hover:cursor-pointer p-2 bg-white rounded-full"
              >
                <ShoppingCart size={20} className="text-red-900" />
                <span className="absolute px-1 font-bold text-white bg-red-400 rounded-full -top-1 -right-1 text-xs min-w-5 h-5 flex items-center justify-center">
                  {cart.length}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-green-950 border-t border-green-800 shadow-lg">
            <div className="flex flex-col p-4 space-y-4">
              {/* Navigation Links */}
              <div 
                className="text-white font-bold text-lg py-3 px-4 hover:bg-green-600 rounded cursor-pointer"
                onClick={() => {navigate("products"); setMobileMenuOpen(false);}}
              >
                MENUS
              </div>
              <div 
                className="text-white font-bold text-lg py-3 px-4 hover:bg-green-600 rounded cursor-pointer"
                onClick={() => {navigate("about"); setMobileMenuOpen(false);}}
              >
                ABOUT US
              </div>
              <div 
                className="text-white font-bold text-lg py-3 px-4 hover:bg-green-600 rounded cursor-pointer"
                onClick={() => {navigate("contacts"); setMobileMenuOpen(false);}}
              >
                CONTACTS
              </div>
              
              {/* Mobile Actions */}
              <div className="border-t border-green-800 pt-4 space-y-3">
                <div
                  onClick={() => {navigate("cart"); setMobileMenuOpen(false);}}
                  className="flex items-center justify-between text-white font-bold py-3 px-4 bg-green-800 rounded-lg hover:bg-green-700 cursor-pointer"
                >
                  <span>Cart</span>
                  <div className="flex items-center space-x-2">
                    <ShoppingCart size={20} />
                    <span className="px-2 py-1 bg-red-400 rounded-full text-sm">
                      {cart.length}
                    </span>
                  </div>
                </div>
                
                {isAuthenticated ? (
                  <div
                    onClick={() => {navigate("profile"); setMobileMenuOpen(false);}}
                    className="flex items-center space-x-2 text-white font-bold py-3 px-4 bg-green-800 rounded-lg hover:bg-green-700 cursor-pointer"
                  >
                    <User2 size={20} />
                    <span>Profile</span>
                  </div>
                ) : (
                  <button
                    onClick={() => {navigate("login"); setMobileMenuOpen(false);}}
                    className="w-full px-4 py-3 font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-200"
                  >
                    Login
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </header>
      
      {/* Spacer div - responsive height */}
      <div className="w-full h-20 lg:h-30"></div>
    </>
  );
};

export default OrderHeader;