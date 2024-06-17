import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Loading from './Loading/Loading';
import EditHospital from './EditHospital';
import AddHospital from './AddHospital';

const AdminHospital = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [addHospital, setAddHospital] = useState(false)
    const [hospital, setHospital] = useState([]);


    const getAllHospital = async () => {
        try {
          const res = await axios.get(`http://localhost:5005/api/admin/get-all-hospital`, {
            withCredentials: true,
          });
          setHospital(res.data.data);
         
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      };
      useEffect(() => {
        getAllHospital();
      }, []);

  return (
    <div>
    <div>
      <button className="bg-[#54399b] text-white px-2 py-2 rounded-sm shadow-md hover:scale-95 transition-transform" onClick={()=> setAddHospital(true)}>
        Add New Hospital
      </button>
    </div>
    {isLoading ? (
      <div>
        <Loading />
      </div>
    ) : (
      <div>
        {hospital.length===0   ? (
          <div>No Hospitals available.</div>
        ) : (
          <div className='py-4 px-2'>
              <div className='flex flex-col gap-4'>
                    {hospital.map((hospital, index) => (
                    <EditHospital hospital={hospital} key={index}/>
                ))}
                </div>
            
          </div>
        )}
      </div>
    )}
    {
      addHospital && <div className='absolute top-0 left-0 w-[98.9vw] h-[86.7vh] overflow-hidden bg-black bg-opacity-50'>
       <AddHospital setAddHospital = {setAddHospital}/>
      </div>
    }
  </div>

  )
}

export default AdminHospital