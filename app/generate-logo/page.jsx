"use client"
import React, { use, useContext, useEffect } from 'react'
import Prompt from '../_data/Prompt';
import { UserDetailContext } from '../_context/UserDetailContext';
import axios from 'axios';
import Image from 'next/image';
function GenerateLogo() {
    const { userDetails, setUserDetails } = useContext(UserDetailContext);
    console.log("User details in GenerateLogo page:", userDetails);
    const [formData, setFormData] = React.useState();
    const [loading, setLoading] = React.useState(false);
    const [logoimage, setLogoImage] = React.useState();
    
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
        desc: formData?.desc
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
      {!loading&& <Image src={logoimage} alt="Generated Logo" width={300} height={300} />}
    </div>
  )
}

export default GenerateLogo;