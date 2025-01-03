import Image from "next/image";
import React from "react";

export default function Home() {
  return (
    <>
      <div className="w-full h-dvh p-8">
        <div className="flex w-full justify-center">
          <h1 className="font-extrabold text-6xl">MoDarly</h1>
        </div>
        <div className="w-full flex justify-center pt-10">
          <Image src="/modarly.jpeg" alt="logo" width={800} height={800} />
        </div>
      </div>
    </>
  );
}
