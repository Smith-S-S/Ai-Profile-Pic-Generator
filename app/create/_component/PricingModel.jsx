import React, { useEffect } from 'react'
import HeadingDescription from './HeadingDescription'
import Lookup from '@/app/_data/Lookup'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { SignInButton } from '@clerk/nextjs'
import { useUser } from '@clerk/nextjs';
import Link from 'next/link'


function PricingModel({formData}) {

  const {user} = useUser();

  useEffect(() => {
    if (formData?.platform && typeof window !== 'undefined') 
      {
        localStorage.setItem("formData", JSON.stringify(formData));
      }
  }, [formData]);

  // Show pricing only for unsigned users
  if (user) return null;

  return (
    <div className='my-10'>
        <HeadingDescription
        title={Lookup.LogoPricingModelTittle}
        description={Lookup.LogoPricingModelDesc}/>

        <div className='grid grid-cols-1 gap-5 mt-5'>
            {Lookup.pricingOpttions.filter(p=>p.tittle==="Pro").map((pricing,index)=>(
                <div key={index}
                className='p-5 hover:border-2 rounded-xl  flex flex-col items-center justify-center text-center border'>
                    <Image src={pricing.icon} alt ={pricing.tittle} width={60} height={60}></Image>

                    <h3 className='text-2xl font-bold mt-3'>{pricing.tittle}</h3>
                    <div>
                        {pricing.features.map((feature, index) => (
                            <p key={index} className='text-lg ext-gray-600 mt-2 text-left'>{feature}</p>
                        ))}                      
                    </div>

                    <SignInButton mode="modal" forceRedirectUrl={"/generate-logo?type="+pricing.tittle}> 
                      <Button className="mt-5 cursor-pointer">{pricing.button}</Button> 
                    </SignInButton>

                </div>

            ))}
        </div>
    </div>
  )
}

export default PricingModel