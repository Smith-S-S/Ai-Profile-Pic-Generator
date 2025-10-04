"use client"
import React from 'react'
import HeadingDescription from './HeadingDescription'
import Lookup from '@/app/_data/Lookup'
import LogoDisgData from '@/app/_data/LogoDisgData'
import  Image from 'next/image'
import { useState } from 'react'


function LogoDesigns({onHandleInputChange, formData}) {

  const[selectedOption, setSelectedOption] = useState(formData?.design?.title);

  return (
    <div className='mt-10'>
      <HeadingDescription
        title={Lookup.LogoDesignTitle}
        description={Lookup.LogoDesignDesc} />

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-5'>
          {LogoDisgData.map((design, index) => (
            <div key = {index} 
            onClick={() => 
            {
              setSelectedOption(design.title);
              onHandleInputChange(design)
            }}

            className={`p-4 hover:border-2 rounded-xl cursor-pointer transition-all duration-200 bg-card border-2 ${
              selectedOption === design.title 
                ? 'border-electric-blue bg-electric-blue/10 glow-electric-blue' 
                : 'border-gray-200 hover:border-electric-blue/50'
            }`}>
              <Image src={design.image} alt={design.title} width={300} height={200} className='w-full rounded-lg h-auto object-cover mb-3' />
              <h3 className="font-bold text-center text-dark-navy">{design.title}</h3>
            </div>
          ))}
        </div>
      
    </div>
  )
}

export default LogoDesigns