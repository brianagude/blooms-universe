import Image from "next/image";
import SignUpForm from "./inputs/SignUpForm"

export default function NewsletterPopup() {
  return (
    <div className="z-10 flex flex-col items-center justify-center gap-8 w-full max-w-2xl">
        <Image 
          src="/images/kiante.jpg" 
          alt="painting of Kiante Springette" 
          width={188}
          height={254}
          priority
          className="rounded-3xl border border-black"
        />
        <div className="bg-white p-4 w-full rounded-[32px] flex flex-col items-center justify-center gap-6 border border-green">
          <div className="text-center space-y-2">
            <h1 className="font-kiante uppercase text-3xl leading-tight md:text-5xl">Welcome to Blooms&nbsp;Universe</h1>
            <p className="font-colby text-black text-center text-sm leading-[1.5] w-full max-w-md mx-auto md:text-base">We&apos;re not quite open yet, but when we do you&apos;ll be the first to&nbsp;know!</p>
          </div>
          <SignUpForm/>
        </div>
      </div>
  );
}
