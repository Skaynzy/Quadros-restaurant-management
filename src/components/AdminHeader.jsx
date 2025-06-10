import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X, LayoutDashboard, Users, Package } from "lucide-react";
import logo from "../assets/quadros_logo1.jpg";

const AdminHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      path: "/dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      path: "/manage-accounts",
      label: "Manage Accounts",
      icon: Users,
    },
    {
      path: "/manage-products",
      label: "Manage Products",
      icon: Package,
    },
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      <header className="bg-red-800 font-bold h-27.5 relative z-50">
        <div className="container mx-auto px-4 h-full flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center gap-3">
            <img 
              src={logo} 
              alt="logo" 
              className="w-25 h-25 rounded-full border-2 "
            />
            <span className="text-white text-lg font-bold ">
              Admin Panel
            </span>
          </div>

          {/* Sign out btn */}
          <button>Sign-Out</button>
          {/* Hamburger Menu Button */}

          <button
            onClick={toggleMenu}
            className="p-2 text-white hover:bg-red-700 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Menu Dropdown */}
        {isMenuOpen && (
          <div className="absolute top-27.5 left-0 right-0 bg-red-800 border-t border-red-700 shadow-lg">
            <nav className="py-2">
              {menuItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <button
                    key={item.path}
                    onClick={() => handleNavigation(item.path)}
                    className={`w-full flex items-center gap-3 px-6 py-3 text-left transition-colors ${
                      isActiveRoute(item.path)
                        ? "bg-red-900 text-white border-r-4 border-red-400"
                        : "text-red-100 hover:bg-red-700 hover:text-white"
                    }`}
                  >
                    <IconComponent className="w-5 h-5" />
                    <span className="text-xl font-bold">{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        )}
      </header>

      {/* Overlay for menu */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  );
};

export default AdminHeader;