import React from 'react'
import hero from "../assets/hero.jpg"

const Home = () => {
  return (
    <div className='w-screen'>
      <div className="container max-w-[1400px] mx-auto p-10 flex items-center justify-center gap-5">
          <h1 className='max-w-[600px] text-center text-xl font-semibold'>
          "The GPS system of these smart ambulances is upgraded enough to fetch the real-time data from the traffic management authorities. This will provide the vehicle with the most suitable route to avoid traffic congestion. In emergencies, this collaboration between the ambulance, hospital, and traffic police ensures rapid response and swift patient transfer"​ <i className='text-[#7352c8]'>(The Healthcare Guys)</i>
          </h1>
          <div className='w-[600px]]'>
            <img src="https://images.unsplash.com/photo-1600959907703-125ba1374a12?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
          </div>
      </div>
    </div>
  )
}

export default Home