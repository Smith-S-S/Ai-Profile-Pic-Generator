// "use client"
import { db } from "@/configs/FirebaseConfig"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { NextResponse } from "next/server";

export async function POST(request) {
    const {userEmail, userName} = await request.json()
    try {
        // if user not exist then create a new user

        const docRec = doc(db, "users", userEmail)
        const docsnap = await getDoc(docRec);
        if (docsnap.exists()) 
            {
            return NextResponse.json(docsnap.data())
            }
        else{
            // insert user data with default credits
            const defaultCredits = parseInt(process.env.DEFAULT_USER_CREDITS) || 5;
            const data = {
                email: userEmail,
                name: userName,
                credits: defaultCredits
            }
            await setDoc(doc(db, "users", userEmail), {
                ...data,
            })
            return NextResponse.json(data)
        }

    } catch (error) {
        console.log("Error in creating user", error)
        return NextResponse.json({error: "Error in creating user"}, {status: 500})
    }
}