import logo from "../assets/quadros_logo1.jpg";
import { Navigate, replace, useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import { useEffect, useState } from "react";
import loginBG from "../assets/loginBG - Copy.jpg";
import { Eye, EyeOff } from "lucide-react";

const LoginPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div 
      className="w-full min-h-screen flex items-center justify-center relative bg-cover bg-center bg-no-repeat px-4"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${loginBG})`
      }}
    >
      <div 
        onClick={() => navigate('/')} 
        className="absolute top-4 left-4 md:top-5 md:left-5 p-3 md:p-5 bg-red-700 rounded-xl font-bold cursor-pointer text-white text-sm md:text-base duration-200
        border-1 hover:border-red-700 hover:bg-white hover:text-red-700"
      >
        Back to Home Page
      </div>
      
      <div className="w-full max-w-sm md:max-w-md bg-green-800 rounded-sm border-white border mt-20 sm:mt-0">
        <div className="text-center pt-5">
          <img src={logo} className="w-16 h-16 md:w-20 md:h-20 rounded-full mx-auto mb-5" alt="logo" />
          <div className="text-2xl md:text-3xl font-bold text-white">LOGIN</div>
        </div>
        
        <div className="m-5 text-lg md:text-xl">
          <div className="block mb-5">
            <label htmlFor="email" className="text-white">Email:</label>
            <input type="text" id="email" className="w-full bg-white text-black rounded-sm p-2"/>
          </div>
          <div className="block">
            <label htmlFor="password" className="text-white">Password:</label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                id="password" 
                className="w-full bg-white text-black rounded-sm p-2 pr-10"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="!bg-white !border-0   absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                {showPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>
          </div>
        </div>
        
        <div className="text-center text-white mb-4">Forgot Password?</div>
        <div className="text-center pb-5">
          <button className="h-12 md:h-15 w-28 md:w-30 bg-amber-600 hover:bg-amber-700 text-white rounded-sm font-bold">
            LOG IN
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;