import Image from "next/image";

export default function Home() {
  return (
    <div className="px-4 h-full flex flex-col flex-1">
      <div className="p-4 pt-10 sm:pt-0 h-full flex-1 flex flex-col items-center justify-center border-black border rounded-[40px] overflow-hidden relative w-full">
        {/* <Image 
          src="/logo.svg" 
          alt="blooms logo" 
          width={72}
          height={69}
          className="absolute bottom-10 left-10 z-10 hidden md:block"
        /> */}
        <Image 
          src="/images/texture.jpg" 
          alt="texture made of images of fabric found in brooklyn" 
          fill
          priority
          className="object-cover z-0"
        />
      </div>
    </div>
  );
}