import React from 'react'
import HeadingDescription from './HeadingDescription'
import Lookup from '@/app/_data/Lookup'
function LogoDes({onHandleInputChange, formData}) {
  return (
    <div className='mt-10'>
      <HeadingDescription
        title={Lookup.LogoDescTitle}
        description={Lookup.LogoDesDes}/>

    <input type="text" placeholder={Lookup.InputTittlePlaceHolder} 
    className='border border-gray-300 rounded-lg p-4 mt-5 w-full max-w-md focus:outline-none focus:ring-2 focus:ring-blue-500'
    defaultValue={formData?.desc}
    // value={formData?.desc}
    onChange={(e) => onHandleInputChange(e.target.value)}
    />


    </div>
  )
}

export default LogoDes