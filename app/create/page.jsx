"use client"
import { useState } from 'react'
import React from 'react'
import LogoTitle from './_component/LogoTitle'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import LogoDes from './_component/LogoDes'
import LogoColorPalete from './_component/LogoColorPalete'
import LogoDesigns from './_component/LogoDesigns'
import LogoIdea from './_component/LogoIdea'
import PricingModel from './_component/PricingModel'


function CreateLogo() {

    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState()
    const onHandleInputChange = (field, value) => {

        setFormData(prev=> ({
            ...prev,
            [field]: value
        }))
    }
    console.log("formData", formData);

  return (
    <div className='mt-28 p-10 border border-electric-blue/30 rounded-xl 2xl:mx-72 bg-card shadow-lg'>
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-electric-blue">Create Your Logo</h2>
          <span className="text-sm text-muted-foreground">Step {step} of 6</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-gradient-electric h-2 rounded-full transition-all duration-300" 
            style={{ width: `${(step / 6) * 100}%` }}
          ></div>
        </div>
      </div>

        {step ==1?
        <LogoTitle onHandleInputChange={(v)=>onHandleInputChange("title", v)} formData = {formData}/>:
        step ==2?
        <LogoDes onHandleInputChange={(v)=>onHandleInputChange("desc", v)} formData = {formData}/>:
        step ==3?
        <LogoColorPalete onHandleInputChange={(v)=>onHandleInputChange("pattet", v)} formData = {formData}/>:
        step ==4?
        <LogoDesigns onHandleInputChange={(v)=>onHandleInputChange("design", v)} formData = {formData}/>:
        step ==5?
        <LogoIdea onHandleInputChange={(v)=>onHandleInputChange("idea", v)} formData = {formData}/>:
        step==6?
        <PricingModel onHandleInputChange={(v)=>onHandleInputChange("pricing", v)} formData = {formData}/>:
        null

    }


        <div className='flex items-center justify-between mt-10'>
           {step!=1 && 
           <Button 
           variant="outline" 
           className="border-electric-blue text-electric-blue hover:bg-electric-blue hover:text-white"
           onClick ={()=>setStep(step-1)}> 
           <ArrowLeft/> Previous 
           </Button>}

            <Button 
            className="bg-gradient-electric hover:glow-electric-blue text-white font-semibold"
            onClick ={()=>setStep(step+1)}> 
            <ArrowRight/> Continue 
            </Button>

        </div>

    </div>
  )
}

export default CreateLogo

/*
  🧠 Why are we using this?

    <LogoTitle onHandleInputChange={(v) => onHandleInputChange("title", v)} />

  We're "wrapping" the original onHandleInputChange function inside a new function.

  📦 In React:
    - The child component (LogoTitle) only knows about the input value, like "My Logo".
    - But in the parent, we want to know *which field* this value belongs to (e.g., "title").

  So we create a small function:
    (v) => onHandleInputChange("title", v)

  This "wraps" the original function and adds the first argument ("title") to it.

  🔁 When LogoTitle calls onHandleInputChange("My Logo"),
      it becomes onHandleInputChange("title", "My Logo") in the parent.

  --------------------------
  🐍 Python Analogy:

  def handle_input(field, value):
      print(f"{field}: {value}")

  # We only get the value from somewhere
  def wrapped_handler(value):
      handle_input("title", value)

  # When called:
  wrapped_handler("My Logo")  
  # Output: title: My Logo

  ✅ Same logic in JavaScript/React:
    - Create a wrapper function that adds context
    - Use it as a cleaner way to control what gets passed up from child to parent
*/
