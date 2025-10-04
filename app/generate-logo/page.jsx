"use client"
import React, { use, useContext, useEffect } from 'react'
import Prompt from '../_data/Prompt';
import { UserDetailContext } from '../_context/UserDetailContext';
import axios from 'axios';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { type } from 'os';
import { toast } from 'sonner';


function GenerateLogo() {
    const { userDetails, setUserDetails } = useContext(UserDetailContext);
    console.log("User details in GenerateLogo page:", userDetails);
    const [formData, setFormData] = React.useState();
    const [loading, setLoading] = React.useState(false);
    const [logoimage, setLogoImage] = React.useState();
    
    // get the type of the subscription from the url
    const searchParams = useSearchParams();
    const modelType = searchParams.get('type')

    useEffect(() => {
      if (typeof window != undefined && userDetails?.email) 
        {

          const storage = localStorage.getItem("formData")
          if (storage) {
            setFormData(JSON.parse(storage));
            console.log("formData in GenerateLogo page:", storage);
          }
      }
    }, [userDetails]);

    


const GenerateAiLogo = async () => {

  if (modelType!= "Free" && userDetails?.credits <= 0) {
    // alert("You have no credits left. Please upgrade your plan.");
    toast.error("You have no credits left. Please upgrade your plan.");
    return;
  }

  setLoading(true);
  let PROMPT = "";

  if (formData?.title) {
    PROMPT = Prompt.LOGO_PROMPT
      .replace("{style}", formData?.title || "modern")
      .replace("{company name}", formData?.desc || "Your Company")
      .replace("{industry/niche}", formData?.pattet || "Your Industry")
      .replace("{color scheme}", formData?.design?.title || "Your Color Scheme")
      .replace("{logo type}", formData?.design?.prompt || "Your Logo Type");

    console.log("formated promprt", PROMPT);

    try {
      const result = await axios.post("/api/ai-logo-model", { 
        prompt: PROMPT,
        email: userDetails?.email,
        title: formData?.title,
        desc: formData?.desc,
        type: modelType,
        userCredit: userDetails?.credits
      });

      console.log("AI logo model result", result?.data);

      // ✅ Move this inside the block
      setLogoImage(result?.data?.image);
    } catch (error) {
      console.error("Error generating AI logo:", error);
    }
  }

  setLoading(false);
};


    useEffect(() => {
      if (formData?.title) {
        GenerateAiLogo();
      }
    }, [formData]);

  return (
    <div>
      <h2>{loading && "Loading..."}</h2>
      {!loading&& <Image src={logoimage} alt="Generated Logo" width={200} height={200} />}
    </div>
  )
}

export default GenerateLogo;