import React from 'react';
import drinks from "../../assets/drinks.png";
import logo from "../../assets/logo.png";

const DashboardPage = () => {
  return (
    <div className='flex flex-col justify-center items-center h-[80vh] overflow-hidden'>
      <img src={logo} alt="marylou logo" width={400} height={400} className='mx-auto'/>
      <p className=' text-lg md:text-xl lg:text-2xl font-semibold'>Plateforme de gestion des stock des produits <span className='text-primary'>Coca-Cola</span></p>
      <img src={drinks} alt="marylou logo" width={300} height={300} className='mx-auto'/>
      
    </div>
  )
}

export default DashboardPage