import logo from "../assets/quadros_logo1.jpg";
import { Navigate, replace, useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import { useEffect, useState } from "react";
import loginBG from "../assets/loginBG - Copy.jpg";
import { Eye, EyeOff } from "lucide-react";

const LoginPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, login, userRole } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Define user credentials with roles
      const users = {
        'admin@quadros.com': { password: 'admin123', role: 'admin' },
        'staff@quadros.com': { password: 'staff123', role: 'staff' },
        'rider@quadros.com': { password: 'rider123', role: 'rider' },
        'user@quadros.com': { password: 'user123', role: 'user' }
      };

      const user = users[formData.email];
      
      if (user && user.password === formData.password) {
        // Login successful
        console.log('Login successful for:', user.role); // Debug log
        
        // Call login function from store
        login(user.role);
        
        // Small delay to ensure state is updated
        setTimeout(() => {
          // Navigate based on role
          switch (user.role) {
            case 'admin':
              console.log('Navigating to admin dashboard'); // Debug log
              navigate('/dashboard', { replace: true });
              break;
            case 'staff':
              console.log('Navigating to staff page'); // Debug log
              navigate('/staff/order-management', { replace: true });
              break;
            case 'rider':
              console.log('Navigating to rider page'); // Debug log
              navigate('/rider/order-management', { replace: true });
              break;
            case 'user':
            default:
              console.log('Navigating to home page'); // Debug log
              navigate('/', { replace: true });
              break;
          }
        }, 100);
      } else {
        alert('Invalid email or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred during login');
    } finally {
      setIsLoading(false);
    }
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
          {/* Debug info - remove in production */}
          {isAuthenticated && (
            <div className="text-xs text-white mt-2">
              Logged in as: {userRole}
            </div>
          )}
        </div>
        
        <form onSubmit={handleLogin} className="m-5 text-lg md:text-xl">
          <div className="block mb-5">
            <label htmlFor="email" className="text-white">Email:</label>
            <input 
              type="email" 
              id="email" 
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full bg-white text-black rounded-sm p-2"
              required
              disabled={isLoading}
            />
          </div>
          <div className="block mb-5">
            <label htmlFor="password" className="text-white">Password:</label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                id="password" 
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full bg-white text-black rounded-sm p-2 pr-10"
                required
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="!bg-white !border-0 absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800 transition-colors"
                disabled={isLoading}
              >
                {showPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>
          </div>
          
    
          
          <div className="text-center text-white mb-4">Forgot Password?</div>
          <div className="text-center pb-5">
            <button 
              type="submit"
              disabled={isLoading}
              className="h-12 md:h-15 w-28 md:w-30 bg-amber-600 hover:bg-amber-700 disabled:bg-amber-400 disabled:cursor-not-allowed text-white rounded-sm font-bold"
            >
              {isLoading ? 'LOADING...' : 'LOG IN'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;