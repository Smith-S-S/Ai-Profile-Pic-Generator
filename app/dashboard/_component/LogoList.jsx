"use client";
import React, { useContext, useEffect } from 'react';
import { UserDetailContext } from '@/app/_context/UserDetailContext';
import { collection, getDocs } from "firebase/firestore";
import { db } from '@/configs/FirebaseConfig';
import Image from 'next/image';
import { View } from 'lucide-react';


function LogoList() {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const [logoList, setLogoList] = React.useState([]);

  useEffect(() => {
    userDetail && GetUserLogos();
  }, [userDetail]);

  const GetUserLogos = async() => {
    const querySnapshot = await getDocs(collection(db, "users", userDetail?.email, "logos"));
    setLogoList([]);
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      setLogoList((prev) => [...prev, doc.data()]);

    });
  }


  const ViewLogo = (image) => {
    const imageWindow = window.open();
    imageWindow.document.write(`<img src="${image}" alt="Logo Image" />`);
  }

  return (
    <div className="mt-10">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {logoList.length > 0 ? (
          logoList.map((logo, index) => (
            <div key={index} className="border p-4 rounded-lg mb-4 hover:scale-105 transition-transform duration-200 cursor-pointer"
              onClick={() => ViewLogo(logo?.image)}>
              <Image src={logo?.image} width={100} height={100} alt="logo" />
              <h3 className="font-bold text-lg mt-2">{logo?.title}</h3>
              <p className="text-gray-600">{logo?.description}</p>
            </div>
          ))
        ) : (
          [1, 2, 3, 4, 5, 6].map((_, index) => (
            <div key={index} className="border p-4 rounded-lg mb-4 animate-pulse h-[140px] w-[120px] bg-gray-200" />
          ))
        )}
      </div>
    </div>
  );
}

export default LogoList
