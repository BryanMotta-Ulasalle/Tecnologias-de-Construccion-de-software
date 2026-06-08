import React from 'react'
import { Outlet } from 'react-router-dom'
import video from '../assets/334623.mp4'
import Navbar from '../components/Navbar'

const Main = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        className=" h-full w-full absolute inset-0 object-cover -z-10"
      >
        <source src={video} type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black/60 -z-10" />

      

      <main className="relative z-10">
        <Navbar />
        <Outlet />
      </main>
    </div>
  )
}

export default Main