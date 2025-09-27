"use client"
import React from 'react'
import Lookup from '@/app/_data/Lookup'
import HeadingDescription from './HeadingDescription'
import Colors from '@/app/_data/Colors'
import { useState } from 'react'

function LogoColorPalete({onHandleInputChange, formData}) {

  const [setectionOption, setSetectionOption] = useState(formData?.pattet)

  return (
    <div className='mt-10'>
      <HeadingDescription
        title={Lookup.LogoColorPaletteTitle}
        description={Lookup.LogoColorPaletteDesc} />

        <div className='grid grid-cols-2 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-3 gap-5 mt-5'>
          {Colors.map((color, index) => (
            <div className= {`flex p-1 ${setectionOption==color.name&&'border-2 rounded-lg border-primary'}`} key={index} >
              {color?.colors.map((c,i)=>(
                <div className='h-24 w-full' 
                key={i}

                onClick={() => {
                  setSetectionOption(color.name)
                  onHandleInputChange(color.name)
                
                }}

                style ={{backgroundColor:c}}>

                </div>
              ))}
            </div>))}
        </div>
    </div>
  )
}

export default LogoColorPalete