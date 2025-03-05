"use client";

import Image from "next/image";
import FormRegister from "./form";

export default function RegisterComp() {
  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-60px)]">
      <div className="flex-1 hidden md:flex items-center">
        <div className="text-white mx-10 md:mx-24 flex flex-col gap-3">
          <h1 className="text-3xl font-bold">Post Your Blog</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          <Image src={"/reg.png"} alt="image-reg" width={500} height={500} />
        </div>
      </div>
      <div className="flex-1 flex items-center">
        <div className="bg-white mx-10 my-10 md:mx-24 w-full rounded-xl p-8">
          <p className="text-xl font-bold">Sign Up Now</p>
          <FormRegister />
        </div>
      </div>
    </div>
  );
}
