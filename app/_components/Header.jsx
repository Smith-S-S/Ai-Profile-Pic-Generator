"use client"
import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";
import Link from "next/link";

function Header() { 
    const { user } = useUser();

    return (
        <div className="px-10 lg:px-32 xl:px-40 2xl:px-56 flex justify-between items-center shadow-sm border-b border-electric-blue/20 bg-background/95 backdrop-blur-sm">
            <Image src={"/logo.png"} alt="Logo" width={180} height={100} />
            <div className="flex gap-4 items-center">
                {
                user ? <Link href="/dashboard"><Button className="cursor-pointer bg-gradient-electric hover:glow-electric-blue text-white font-semibold">DashBoard</Button> </Link>:
                <Button className="bg-gradient-electric hover:glow-electric-blue text-white font-semibold">Get Started</Button>  
                }
              <UserButton/>
            </div>
            
        </div>
    )
}

export default Header;