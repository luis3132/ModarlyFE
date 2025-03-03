
import Image from "next/image";

export default function Home() {
  return (
    <div className="w-full max-h-dvh p-8 overflow-hidden">
      <div className="flex w-full justify-center">
        <h1 className="font-extrabold text-6xl">MoDarly</h1>
      </div>
      <div className="w-full flex justify-center pt-10">
        <Image src="/modarly.jpeg" alt="logo" width={600} height={600} />
      </div>
    </div>
  );
}
