"use client";
import React from 'react'
import Lookup from '../_data/Lookup'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import Link from 'next/link';

function Hero() {
  const [platformName, setPlatformName] = useState();
  return (
    <div className="flex flex-col items-center gap-4 mt-32">
        <h2 className='text-red-500 text-5xl text-center font-bold'>{Lookup.HeroHeading}</h2>
        <h2 className='text-5xl text-center font-bold'>{Lookup.HeroSubHeading}</h2>
        <p className='text-lg text-center text-gray-500'>{Lookup.HeroDesc}</p>

        <div className='flex gap-6 w-full max-w-2xl mt-10'>
          <input placeholder={Lookup.InputTittlePlaceHolder} className='border border-gray-300 rounded-lg px-4 py-2 w-full max-w-md focus:outline-none focus:ring-2 focus:ring-blue-500' 
          onChange={(event)=>setPlatformName(event?.target.value)}
          />
          <Link href={platformName ? `/create?PlatformName=${platformName}` : "#"}>

          <Button className=" p-6">Get Started</Button>
          
          </Link>
        </div>
    </div>
  )
}

export default Hero