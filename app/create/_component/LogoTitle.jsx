"use client";  
import React, { useState } from 'react'
import HeadingDescription from './HeadingDescription'
import Lookup from '@/app/_data/Lookup'

function LogoTitle({onHandleInputChange, formData}) {

    const [selectedPlatform, setSelectedPlatform] = useState(formData?.platform);

    const handlePlatformSelect = (platform) => {
        setSelectedPlatform(platform.name);
        onHandleInputChange(platform.name);
    };

  return (
    <div className='mt-10'>
    <HeadingDescription
    title={Lookup?.LogoTitle}
    description={Lookup.LogoTitleDesc}
    />

    <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mt-5 max-w-4xl'>
        {Lookup.platforms.map((platform, index) => (
            <div 
                key={index}
                onClick={() => handlePlatformSelect(platform)}
                className={`p-6 rounded-xl cursor-pointer transition-all duration-300 hover:scale-105 border-2 ${
                    selectedPlatform === platform.name 
                        ? 'border-electric-blue bg-electric-blue/10 glow-electric-blue' 
                        : 'border-gray-200 hover:border-electric-blue/50'
                }`}
            >
                <div className="text-4xl mb-3 text-center">{platform.icon}</div>
                <h3 className="font-bold text-lg text-center text-dark-navy">{platform.name}</h3>
                <p className="text-sm text-center text-muted-foreground mt-2">{platform.description}</p>
            </div>
        ))}
    </div>
    
    </div>
  )
}

export default LogoTitle