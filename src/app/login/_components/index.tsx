"use client";

import Image from "next/image";
import FormLogin from "./form";

export default function LoginComp() {
  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-60px)]">
      <div className="flex-1 flex items-center">
        <div className="bg-white mx-10 my-10 md:mx-24 w-full rounded-xl p-8">
          <p className="text-xl font-bold">Sign In</p>
          <FormLogin />
        </div>
      </div>
      <div className="flex-1 hidden md:flex items-center">
        <div className="text-white mx-10 md:mx-24 flex flex-col gap-3">
          <Image src={"/log.png"} alt="image-reg" width={500} height={500} />
        </div>
      </div>
    </div>
  );
}
