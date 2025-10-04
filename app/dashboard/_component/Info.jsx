"use client";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/configs/FirebaseConfig";
import React, { useContext, useEffect, useState } from "react";
import { UserDetailContext } from "@/app/_context/UserDetailContext";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function Info() {
  const { userDetails, setUserDetails } = useContext(UserDetailContext);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      if (!userDetails?.email) return;
      const docRef = doc(db, "users", userDetails.email);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setUserDetails(docSnap.data()); // overwrite with Firestore data
      }
    };

    fetchUser();
  }, [userDetails?.email]);

  return (
    <div className="bg-card p-6 rounded-xl border border-electric-blue/20 shadow-lg">
      <h2 className="font-bold text-2xl text-electric-blue">Dashboard</h2>
      <div className="flex justify-between items-center">
          <div>
            <h2 className="font-bold text-2xl mt-2 text-dark-navy">Hello {hasMounted ? userDetails?.name || "Guest" : ""}</h2>
          </div>
        <div className="flex items-center gap-2 bg-gradient-electric p-3 rounded-lg glow-subtle">
          <Image src={"/dollar.png"} alt="coin" width={40} height={40} />
          <h2 className="font-bold text-3xl text-white">{userDetails?.credits ?? 0} Credit Left</h2>
        </div>
      </div>
        <div className="flex justify-between items-center mt-6">
          
           <Link href="/create">
            <Button className="cursor-pointer bg-gradient-violet hover:glow-violet text-white font-semibold px-6 py-3">+ Create Avatar</Button>
          </Link>

          
        </div>
    </div>
  );
}

export default Info;
