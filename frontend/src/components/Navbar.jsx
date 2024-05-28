import React from "react";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { Button } from 'primereact/button';  
import { useSelector } from "react-redux";

const Navbar = () => {
    const navigate = useNavigate()
    const { userInfo } = useSelector((state) => state.auth);
    const logoutHandler =async()=>{

      
    }

  return (
    <div className="mx-auto w-full shadow-md sticky">
      <div className="container max-w-[1600px] px-4 mx-auto flex items-center justify-between">
        <div className="w-[80px]">
          <img src={logo} alt="logo" />
        </div>
        <div className="flex items-center gap-8 justify-between">
          <h1 className="hover:text-[#7352c8] transition-colors cursor-pointer">WHAT WE DO</h1>
          <h1 className="hover:text-[#7352c8] transition-colors cursor-pointer"> WHO WE ARE</h1>
          <h1 className="hover:text-[#7352c8] transition-colors cursor-pointer"> OUR TECHNOLOGY</h1>
          <h1 className="hover:text-[#7352c8] transition-colors cursor-pointer">RESOURCES</h1>
        </div>
        <div>
            {userInfo ? <button className="bg-[#54399b] text-white px-14 py-3 rounded-full font-light text-lg hover:bg-[#54399b]/80 transition-all delay-75 hover:scale-95" onClick={logoutHandler}>Logout</button>:<button onClick={()=> navigate("/login")} className="bg-[#54399b] text-white px-14 py-3 rounded-full font-light text-lg hover:bg-[#54399b]/80 transition-all delay-75 hover:scale-95">Login</button>}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
