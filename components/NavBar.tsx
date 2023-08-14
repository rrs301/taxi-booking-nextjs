"use client"
import Image from 'next/image'
import React from 'react'
import { UserButton } from "@clerk/nextjs";
import { useUser } from "@clerk/clerk-react";
function NavBar() {
  const { isSignedIn, user, isLoaded } = useUser();
  return isSignedIn&&(
    <div className='flex justify-between
     p-3 px-10 border-b-[1px] shadow-sm'>
        <div className='flex gap-10 items-center'>
            <Image src='/logo.png'
            alt='logo'
            width={120}
            height={60}
            />
            <div className='hidden md:flex gap-6'>
                <h2 className='hover:bg-gray-100 p-2
                rounded-md cursor-pointer transition-all'>Home</h2>
                <h2 className='hover:bg-gray-100 p-2
                rounded-md cursor-pointer transition-all'>History</h2>
                <h2 className='hover:bg-gray-100 p-2
                rounded-md cursor-pointer transition-all'>Help</h2>
            </div>
        </div>
        <UserButton afterSignOutUrl="/"/>
    </div>
  )
}

export default NavBar