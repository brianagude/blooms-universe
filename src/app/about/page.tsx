import Image from "next/image";

export default function Home() {
  return (
    <div className="px-4 h-full flex flex-col flex-1 py-10 items-center justify-center gap-10">
        <Image 
          src="/logo.svg" 
          alt="blooms logo" 
          width={120}
          height={125}
        />

        <div className="w-full max-w-2xl">
          <p className="text-lg font-medium leading-7">
            Growing up, I spent most of my summer days at my grandmother's flower shop in the town of St. Thomas, V.I. Daily, I would run to 'Main Street,' a thoroughfare adorned with the world's premier jewelry shops, where I would try on pieces and engage jewelers with any questions that crossed my mind.
            <br/><br/>
            Being from the islands, the act of adorning oneself with gold assumes a stature akin to a badge of honor. The awareness that my birthplace was acquired through the exchange of gold with the Dutch, coupled with witnessing my family and fellow islanders donning these precious metals, has imbued gold with a profound significance in my life.
            <br/><br/>
            Since relocating to New York, I have been privileged with the opportunity to immerse myself in the realm of exquisite jewelry. This not only allows me to explore its intricate nuances but also enables me to share my personal narrative with a broader audience.
          </p>
        </div>

    </div>
  );
}