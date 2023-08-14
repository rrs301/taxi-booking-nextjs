import { SignIn } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
  return(
    <div className="flex justify-center flex-col m-5 items-center">
      <Image src='/logo.png'
      alt="logo"
      width={100}
      height={100}
      className="mb-6"
      />
       <SignIn />;
    </div>
  )
  
 
}