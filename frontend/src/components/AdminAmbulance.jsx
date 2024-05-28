import React, { useEffect, useState } from 'react';
import Loading from './Loading/Loading';
import axios from 'axios';
import EditAmbulance from './EditAmbulance';
import AddAmbulance from './AddAmbulance';

const AdminAmbulance = ({ userInfo }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [ambulances, setAmbulances] = useState([]);
  const [addAmbulance, setAddAmbulance] = useState(false);

  const getAllAmbulance = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/admin/get-all-ambulance`, {
        withCredentials: true,
      });
      setAmbulances(res.data.data);
     
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllAmbulance();
  }, []);
  console.log(ambulances);

//   const addAmbulance = async(e) => {
//     e.preventDefault();
//     try {
        
//     } catch (error) {
        
//     }
//   }

  return (
    <div>
      <div>
        <button onClick={()=> setAddAmbulance(true)} className="bg-[#54399b] text-white px-2 py-2 rounded-sm shadow-md hover:scale-95 transition-transform">
          Add New Ambulance Driver
        </button>
      </div>
      {isLoading ? (
        <div>
          <Loading />
        </div>
      ) : (
        <div>
          {ambulances.length === 0 ? (
            <div>No ambulances available.</div>
          ) : (
            <div className='py-4 px-2'>
                <div className='flex flex-col gap-4'>
                    {ambulances.map((ambulance, index) => (
                    <EditAmbulance ambulance={ambulance} key={index}/>
                ))}
                </div>
              
            </div>
          )}
        </div>
      )}
      {
        addAmbulance && <div className='absolute top-0 left-0 w-[98.9vw] h-[86.7vh] overflow-hidden bg-black bg-opacity-50'>
            <AddAmbulance setAddAmbulance = {setAddAmbulance}/>
        </div>
      }
    </div>
  );
};

export default AdminAmbulance;
