import logo from "../assets/quadros_logo1.jpg";
import { Navigate, replace, useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import { useEffect } from "react";

const LoginPage = () => {
  const navigate = useNavigate();
  const {isAuthenticated} = useAuthStore();


  useEffect(()=>{
    if (isAuthenticated){
      navigate('/',{replace: true});
    }
  },[isAuthenticated,navigate]);
  
  
  return <div className="bg-green-905 w-full h-screen content-center justify-items-center">
    <div className="w-90 h-115 rounded-sm bg-green-800 border-white border-1">
      <div className="justify-items-center">
        <img src={logo} className="w-20 h-20 rounded-full m-5" alt="logo" />
        <div className="text-3xl font-bold">LOGIN</div>
      </div>
      <form action="" className="m-5 text-xl">
        <div className="block">
          <label htmlFor="email">Email:</label>
          <input type="text" id="email" className="w-full bg-white text-black rounded-sm"/>
        </div>
        <div className="block mt-5">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" className="w-full bg-white text-black rounded-sm"/>
        </div>
      </form>
      <div className="text-center">Forgot Password?</div>
      <div className="text-center">
        <button className="h-15 w-30 m-2.5 rounded-sm text-center content-center">LOG IN</button>
        <button className="h-15 w-30 m-2.5 rounded-sm text-center content-center">SIGN UP</button>
      </div>
    
    
    </div>
  </div>;
};

export default LoginPage; 
