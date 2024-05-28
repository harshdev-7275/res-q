import React, { useEffect, useState } from "react";
import { useLoginMutation } from "../slices/userApiSlice";
import { setCredentials, logout } from "../slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [login, {isError, isLoading, isSuccess}] = useLoginMutation();
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {userInfo } = useSelector((state) => state.auth)

    useEffect(() => {
      if(userInfo){
        if(userInfo){
          if(userInfo.role === "ADMIN"){
            navigate("/admin")
          }
          
          
        }
      }
    })

    const loginHandler = async(e)=>{
        e.preventDefault();
        if(!email || !password){
            toast.error("Please provide email and password")
            return
        }
        try {
            const res = await login({email, password}).unwrap();

                console.log(res);
                // const data = res.data
                dispatch(setCredentials({ ...res }));
                toast.success("Login successful");
                if(res.role === "ADMIN"){
                    navigate("/admin")
                }
                if(res.role === "AMBULANCE"){
                    navigate("/ambulance")
                }
                if(res.role === "HOSPITAL"){
                    navigate("/hospital")
                }
                if(res.role === "TRAFFIC"){
                    navigate("/traffic")
                }

               
            
        } catch (error) {
             console.error(error?.data);
      toast.error(error?.data.error || "An error occurred");
        }
        
    }


  return (
    <div className="mx-auto">
      <div className="w-[1000px] mx-auto mt-[3rem] flex flex-col items-center justify-center gap-3">
        <div className="flex flex-col items-start gap-4">
          <h1 className="text-4xl font-semibold text-center">Login</h1>
          <p>Sign in with email</p>
        </div>
        <form onSubmit={loginHandler} className="flex flex-col gap-5 items-center mt-10">
          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className=" px-4 py-3 outline-none border-2 border-[#eee] rounded-full focus:border-[#54399b]"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className=" px-4 py-3 outline-none border-2 border-[#eee] rounded-full focus:border-[#54399b]"
            />
          </div>
          <div className="items-center">
            <button
              className="bg-[#54399b] text-white px-14 py-3 rounded-full font-light text-lg hover:bg-[#54399b]/80 transition-all delay-75 hover:scale-95"
            >
              Login
            </button>
          </div>
        </form>
      </div>
      <Toaster />
    </div>
  );
};

export default Login;
