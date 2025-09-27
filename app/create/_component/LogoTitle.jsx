"use client";  
import React, { use, useState } from 'react'
import HeadingDescription from './HeadingDescription'
import Lookup from '@/app/_data/Lookup'
import { useSearchParams } from 'next/navigation'


function LogoTitle({onHandleInputChange}) {

    const searchParam = useSearchParams();
    // const tittle = searchParam.get("title");
    const [tittle, setTittle] = useState(searchParam?.get("title")?? "");

  return (
    <div className='mt-10'>
    <HeadingDescription
    title={Lookup?.LogoTitle}
    description={Lookup.LogoTitleDesc}
    />

    <input type="text" placeholder={Lookup.InputTittlePlaceHolder} 
    className='border border-gray-300 rounded-lg p-4 mt-5 w-full max-w-md focus:outline-none focus:ring-2 focus:ring-blue-500'
    defaultValue={tittle}
    onChange={(e) => onHandleInputChange(e.target.value)}
    />
    
    </div>
  )
}

export default LogoTitle