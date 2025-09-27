import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

function Header() { 
    return (
        <div className="px-10 lg:px-32 xl:px-40 2xl:px-56 flex justify-between items-center shadow-sm">
            <Image src = {"/logo.svg"} alt="Logo" width={180} height={100} />
            <Button>get started</Button>
        </div>
    )
}

export default Header;