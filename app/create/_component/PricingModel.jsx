import React from 'react'
import HeadingDescription from './HeadingDescription'
import Lookup from '@/app/_data/Lookup'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
function PricingModel() {
  return (
    <div className='my-10'>
        <HeadingDescription
        title={Lookup.LogoPricingModelTittle}
        description={Lookup.LogoPricingModelDesc}/>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-5 mt-5'>
            {Lookup.pricingOpttions.map((pricing,index)=>(
                <div key={index}
                className='p-5 hover:border-2 rounded-xl cursor-pointer flex flex-col items-center justify-center text-center border'>
                    <Image src={pricing.icon} alt ={pricing.tittle} width={60} height={60}></Image>

                    <h3 className='text-2xl font-bold mt-3'>{pricing.tittle}</h3>
                    <div>
                        {pricing.features.map((feature, index) => (
                            <p key={index} className='text-lg ext-gray-600 mt-2 text-left'>{feature}</p>
                        ))}                      
                    </div>
                  <Button className="mt-5">{pricing.button}</Button> 
                </div>

            ))}
        </div>
    </div>
  )
}

export default PricingModel