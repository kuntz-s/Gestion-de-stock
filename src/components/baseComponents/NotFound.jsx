import React from 'react';
import notFound from "../../assets/notFound.svg";

const NotFound = () => {
  return (
    <div className='w-full mt-4'>
        <img src={notFound} alt="not found" className='mx-auto' width={400} height={400}/>
        <p className='text-center text-lg'>Aucune donnée trouvée</p>
    </div>
  )
}

export default NotFound