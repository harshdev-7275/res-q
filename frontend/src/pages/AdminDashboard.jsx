import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import AdminAmbulance from '../components/AdminAmbulance';
import { useNavigate } from 'react-router-dom';
import AdminHospital from '../components/AdminHospital';
import AdminTraffic from '../components/AdminTraffic';

const AdminDashboard = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate()

  const [isAmbulanceClicked, setIsAmbulanceClicked] = useState(false);
  const [isHospitalClicked, setIsHospitalClicked] = useState(false);
  const [isTrafficClicked, setIsTrafficClicked] = useState(false);
  useEffect(() => {
    if(!userInfo){
      navigate("/login")
    }else{
      setIsAmbulanceClicked(true);
      setIsHospitalClicked(false);
      setIsTrafficClicked(false);
    }
  },[])

  const ambulanceClickHandler = (e) => {
    e.preventDefault();
    setIsAmbulanceClicked(true);
    setIsHospitalClicked(false);
    setIsTrafficClicked(false);
  };

  const hospitalClickHandler = (e) => {
    e.preventDefault();
    setIsHospitalClicked(true);
    setIsAmbulanceClicked(false);
    setIsTrafficClicked(false);
  };

  const trafficClickHandler = (e) => {
    e.preventDefault();
    setIsTrafficClicked(true);
    setIsAmbulanceClicked(false);
    setIsHospitalClicked(false);
  };

  return (
    <div className='w-[90vw] h-[60vh]'>
      <div className='container w-full h-full mx-auto relative'>
        <h1 className='text-center text-4xl mt-3'>Admin Dashboard</h1>
        {/* Aside bar */}
        <div className='absolute top-[30%] h-[400px] w-[200px] left-[100px] bg-[#54399b] text-white flex flex-col items-center justify-evenly rounded-lg shadow-md shadow-[#54399b] z-50 text-xl'>
          <button
            onClick={ambulanceClickHandler}
            className={isAmbulanceClicked ? 'text-[#7352c8] bg-white w-full py-4' : 'hover:text-[#7352c8] hover:bg-white w-full py-4'}
          >
            Ambulance Driver
          </button>
          <button
            onClick={hospitalClickHandler}
            className={isHospitalClicked ? 'text-[#7352c8] bg-white w-full py-4' : 'hover:text-[#7352c8] hover:bg-white w-full py-4'}
          >
            Hospital
          </button>
          <button
            onClick={trafficClickHandler}
            className={isTrafficClicked ? 'text-[#7352c8] bg-white w-full py-4' : 'hover:text-[#7352c8] hover:bg-white w-full py-4'}
          >
            Traffic Police
          </button>
        </div>

        {/* Main content */}
        <div className='ml-80 mt-10'>
        {
          isAmbulanceClicked &&<>
            <AdminAmbulance userInfo = {userInfo}/>
          </>
        }
        {isHospitalClicked && <>
          <AdminHospital userInfo={userInfo}/>
        </>}
        {
          isTrafficClicked&&<>
            <AdminTraffic userInfo = {userInfo} />
          </>
        }
        </div>
       
      </div>
    </div>
  );
};

export default AdminDashboard;
