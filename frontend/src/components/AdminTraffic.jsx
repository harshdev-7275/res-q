import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Loading from './Loading/Loading';
import EditTraffic from './EditTraffic';
import AddTraffic from './AddTraffic';

const AdminTraffic = ({userInfo}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [addTraffic, setAddTraffic] = useState(false)
    const [traffic, setTraffic] = useState([]);


    const getAllTraffic = async () => {
        try {
          const res = await axios.get(`http://localhost:5000/api/admin/get-all-traffic`, {
            withCredentials: true,
          });
          setTraffic(res.data.data);
         
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      };
      console.log(traffic); 
      useEffect(() => {
        getAllTraffic();
      }, []);
  return (
    <div>
    <div>
      <button className="bg-[#54399b] text-white px-2 py-2 rounded-sm shadow-md hover:scale-95 transition-transform" onClick={()=> setAddTraffic(true)}>
        Add New Traffic Police
      </button>
    </div>
    {isLoading ? (
      <div>
        <Loading />
      </div>
    ) : (
      <div>
        {traffic.length===0   ? (
          <div className='text-center mt-36 text-xl font-medium'>No Traffic Police available.</div>
        ) : (
          <div className='py-4 px-2'>
              <div className='flex flex-col gap-4'>
                    {traffic.map((traffic, index) => (
                    <EditTraffic traffic={traffic} key={index}/>
                ))}
                </div>
            
          </div>
        )}
      </div>
    )}
    {
      addTraffic && <div className='absolute top-0 left-0 w-[98.9vw] h-[86.7vh] overflow-hidden bg-black bg-opacity-50'>
       <AddTraffic setAddTraffic = {setAddTraffic}/>
      </div>
    }
  </div>

  )
}

export default AdminTraffic