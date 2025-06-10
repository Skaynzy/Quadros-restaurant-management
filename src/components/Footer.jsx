import React from "react";
import fbLogo from "../assets/fbLogo.svg"
import ytLogo from "../assets/ytlogo.svg"
import { Navigate, useNavigate } from "react-router-dom";
  const Footer = () => {
  const today = new Date();
  const year = today.getFullYear();
  
  const navigate = useNavigate();


  return(
     <>
     <div className="bg-red-950 h-auto flex flex-wrap p-5">
      <div className="w-1/2 text-center text-xl font-bold">
        <div>© 2021 - {year} Quadros Pizza Alaminos</div>
        <div>All Rights Reserved</div>
      </div>
      <div className="w-1/2 text-center text-xl font-bold">
        <div>Follow Us On Social Media</div>
        <div className="flex flex-wrap justify-center">
        <img src={fbLogo} alt="facebook" className="size-15 invert mr-5 ml-5 rounded-xl duration-200
        hover:invert-0 hover:bg-white cursor-pointer"
        onClick={()=>window.open('https://www.facebook.com/quadropizza2021')}/>
        <img src={ytLogo} alt="youtube" className="size-15 invert mr-5 ml-5 rounded-xl duration-200
        hover:invert-0 hover:bg-white cursor-pointer"
        onClick={()=>window.open('https://www.youtube.com/@quadropizzahub')}/>  
        </div>
      </div>
     </div>
     </>
  )
};

export default Footer;
