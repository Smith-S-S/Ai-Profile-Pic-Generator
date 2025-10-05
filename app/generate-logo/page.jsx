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
          console.log("Raw localStorage data:", storage);
          if (storage) {
            const parsedData = JSON.parse(storage);
            setFormData(parsedData);
            console.log("Parsed formData in GenerateLogo page:", parsedData);
          } else {
            console.log("No formData found in localStorage");
          }
      }
    }, [userDetails]);

    


const GenerateAiLogo = async () => {
  console.log("GenerateAiLogo called with formData:", formData);
  console.log("ModelType:", modelType);
  console.log("UserCredits:", userDetails?.credits);

  if (modelType!= "Free" && userDetails?.credits <= 0) {
    // alert("You have no credits left. Please upgrade your plan.");
    toast.error("You have no credits left. Please upgrade your plan.");
    return;
  }

  setLoading(true);
  let PROMPT = "";

  if (formData?.platform) {
    PROMPT = Prompt.LOGO_PROMPT
      .replace("{design.title}", formData?.design?.title || "Meme")
      .replace("{design.prompt}", formData?.design?.prompt || "modern and clean")
      .replace("{keywords}", formData?.keywords?.join(', ') || "developer")
      .replace("{platform}", formData?.platform || "GitHub")
      .replace("{palette}", formData?.pattet || "electric blue");

    console.log("formated promprt", PROMPT);

    try {
      const result = await axios.post("/api/ai-logo-model", { 
        prompt: PROMPT,
        email: userDetails?.email,
        title: formData?.platform,
        desc: formData?.keywords?.join(', '),
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
      console.log("useEffect triggered with formData:", formData);
      if (formData?.platform && formData?.keywords && formData?.design) {
        console.log("All required fields present, calling GenerateAiLogo");
        GenerateAiLogo();
      } else {
        console.log("Missing required fields:", {
          platform: formData?.platform,
          keywords: formData?.keywords,
          design: formData?.design
        });
      }
    }, [formData]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-electric-blue mb-4">⚡ AI Avatar Generator</h1>
          <p className="text-lg text-muted-foreground">Creating your unique digital identity...</p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-electric-blue mb-4"></div>
            <h2 className="text-2xl font-semibold text-dark-navy mb-2">Generating Your Avatar</h2>
            <p className="text-muted-foreground">This may take a few moments...</p>
          </div>
        )}

        {/* Generated Logo Display */}
        {!loading && logoimage && (
          <div className="flex flex-col items-center">
            <div className="bg-card p-8 rounded-2xl border border-electric-blue/20 shadow-lg glow-subtle mb-6">
              <Image 
                src={logoimage} 
                alt="Generated Avatar" 
                width={400} 
                height={400} 
                className="rounded-xl"
              />
            </div>
            
            <div className="text-center">
              <h3 className="text-2xl font-bold text-dark-navy mb-4">Your Avatar is Ready! 🎉</h3>
              <div className="flex flex-wrap gap-4 justify-center">
                <button 
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = logoimage;
                    link.download = `avatar-${formData?.platform || 'profile'}.png`;
                    link.click();
                  }}
                  className="px-6 py-3 bg-gradient-electric hover:glow-electric-blue text-white rounded-lg font-semibold transition-all duration-200 cursor-pointer"
                >
                  📥 Download Avatar
                </button>
                <button 
                  onClick={() => {
                    const newWindow = window.open('', '_blank');
                    newWindow.document.write(`
                      <html>
                        <head><title>Avatar - Full Size</title></head>
                        <body style="margin:0; padding:20px; background:#f0f0f0; display:flex; justify-content:center; align-items:center; min-height:100vh;">
                          <img src="${logoimage}" alt="Generated Avatar" style="max-width:100%; max-height:100%; border-radius:10px; box-shadow:0 4px 20px rgba(0,0,0,0.1);" />
                        </body>
                      </html>
                    `);
                    newWindow.document.close();
                  }}
                  className="px-6 py-3 border border-electric-blue text-electric-blue hover:bg-electric-blue hover:text-white rounded-lg font-semibold transition-all duration-200 cursor-pointer"
                >
                  🔍 View Full Size
                </button>
              </div>
            </div>
          </div>
        )}

        {/* No Data State */}
        {!loading && !logoimage && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🎨</div>
            <h2 className="text-2xl font-bold text-dark-navy mb-4">No Avatar Generated Yet</h2>
            <p className="text-muted-foreground mb-6">Complete the form steps to generate your AI avatar.</p>
            <a 
              href="/create"
              className="px-6 py-3 bg-gradient-electric hover:glow-electric-blue text-white rounded-lg font-semibold transition-all duration-200"
            >
              ← Back to Create
            </a>
          </div>
        )}
      </div>
    </div>
  )
}

export default GenerateLogo;