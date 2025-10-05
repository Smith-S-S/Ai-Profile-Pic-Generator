"use client";
import React, { useContext, useEffect } from 'react';
import { UserDetailContext } from '@/app/_context/UserDetailContext';
import { collection, getDocs } from "firebase/firestore";
import { db } from '@/configs/FirebaseConfig';
import Image from 'next/image';
import { View } from 'lucide-react';


function LogoList() {
  const { userDetails, setUserDetails } = useContext(UserDetailContext);
  const [logoList, setLogoList] = React.useState([]);

  useEffect(() => {
    userDetails && GetUserLogos();
  }, [userDetails]);

  const GetUserLogos = async() => {
    const querySnapshot = await getDocs(collection(db, "users", userDetails?.email, "logos"));
    setLogoList([]);
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      setLogoList((prev) => [...prev, doc.data()]);

    });
  }


  const ViewLogo = (imageUrl) => {
    const imageWindow = window.open('', '_blank');
    imageWindow.document.write(`
      <html>
        <head><title>Logo - Full Size</title></head>
        <body style="margin:0; padding:20px; background:#f0f0f0; display:flex; justify-content:center; align-items:center; min-height:100vh;">
          <img src="${imageUrl}" alt="Logo Image" style="max-width:100%; max-height:100%; border-radius:10px; box-shadow:0 4px 20px rgba(0,0,0,0.1);" />
        </body>
      </html>
    `);
    imageWindow.document.close();
  }

  return (
    <div className="mt-10">
      <h3 className="text-2xl font-bold text-dark-navy mb-6">Your Generated Logos</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {logoList.length > 0 ? (
          logoList.map((logo, index) => (
            <div key={index} className="border border-electric-blue/30 p-4 rounded-lg mb-4 hover:scale-105 transition-all duration-200 cursor-pointer bg-card hover:glow-subtle hover:border-electric-blue">
              {logo?.image || logo?.imageUrl ? (
                <>
                  <Image 
                    src={logo?.image || logo?.imageUrl} 
                    width={100} 
                    height={100} 
                    alt="logo" 
                    className="rounded-lg"
                    onError={(e) => {
                      console.error('Image load error:', logo);
                      e.target.style.display = 'none';
                    }}
                  />
                  <div onClick={() => ViewLogo(logo?.image || logo?.imageUrl)} className="cursor-pointer">
                    <h3 className="font-bold text-lg mt-2 text-dark-navy">{logo?.title}</h3>
                    <p className="text-muted-foreground">{logo?.description || logo?.desc}</p>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-24 bg-gradient-electric/10 rounded-lg">
                  <div className="text-2xl mb-2">🎨</div>
                  <h3 className="font-bold text-sm text-dark-navy text-center">{logo?.title}</h3>
                  <p className="text-xs text-muted-foreground text-center">{logo?.description || logo?.desc}</p>
                  <p className="text-xs text-electric-blue mt-1">Generated Successfully</p>
                </div>
              )}
            </div>
          ))
        ) : (
          [1, 2, 3, 4, 5, 6].map((_, index) => (
            <div key={index} className="border border-electric-blue/20 p-4 rounded-lg mb-4 animate-pulse h-[140px] w-[120px] bg-gradient-to-br from-electric-blue/10 to-violet/10" />
          ))
        )}
      </div>
    </div>
  );
}

export default LogoList
