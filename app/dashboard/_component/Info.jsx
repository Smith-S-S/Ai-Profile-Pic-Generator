"use client";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/configs/FirebaseConfig";
import React, { useContext, useEffect, useState } from "react";
import { UserDetailContext } from "@/app/_context/UserDetailContext";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function Info() {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      if (!userDetail?.email) return;
      const docRef = doc(db, "users", userDetail.email);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setUserDetail(docSnap.data()); // overwrite with Firestore data
      }
    };

    fetchUser();
  }, [userDetail?.email]);

  return (
    <div>
      <h2 className="font-bold text-2xl">Dashboard</h2>
      <div className="flex justify-between items-center">
          <div>
            <h2 className="font-bold text-2xl mt-2">Hello {hasMounted ? userDetail?.name || "Guest" : ""}</h2>
          </div>
        <div className="flex items-center gap-2">
          <Image src={"/dollar.png"} alt="coin" width={40} height={40} />
          <h2 className="font-bold text-3xl">{userDetail?.credits ?? 0} Credit Left</h2>
        </div>
      </div>
        <div className="flex justify-between items-center mt-6">
          
           <Link href="/create">
            <Button className="cursor-pointer">+ Create Avatar</Button>
          </Link>

          
        </div>
    </div>
  );
}

export default Info;
