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
        <h2 className='text-electric-blue text-5xl text-center font-bold glow-subtle'>{Lookup.HeroHeading}</h2>
        <h2 className='text-dark-navy text-5xl text-center font-bold'>{Lookup.HeroSubHeading}</h2>
        <p className='text-lg text-center text-muted-foreground'>{Lookup.HeroDesc}</p>

        <div className='flex gap-6 w-full max-w-2xl mt-10'>
          <input placeholder={Lookup.InputTittlePlaceHolder} className='border border-electric-blue rounded-lg px-4 py-2 w-full max-w-md focus:outline-none focus:ring-2 focus:ring-electric-blue focus:glow-electric-blue bg-background text-foreground' 
          onChange={(event)=>setPlatformName(event?.target.value)}
          />
          <Link href={platformName ? `/create?PlatformName=${platformName}` : "#"}>

          <Button className="p-6 bg-gradient-electric hover:glow-electric-blue text-white font-bold">Get Started</Button>
          
          </Link>
        </div>
    </div>
  )
}

export default Hero