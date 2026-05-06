import Image from "next/image";
import { sanityFetch } from "@/sanity/lib/live";
import { homepageBackgroundQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";

export default async function Home() {
  const { data: bg } = await sanityFetch({ query: homepageBackgroundQuery });

  const playbackId =
    bg?.video?.asset?.playbackId ??
    bg?.video?.asset?.data?.playback_ids?.[0]?.id;

  return (
    <div className="px-4 h-full flex flex-col flex-1">
      <div className="p-4 pt-10 sm:pt-0 h-full flex-1 flex flex-col items-center justify-center border-black border rounded-[40px] overflow-hidden relative w-full">
        {bg?.backgroundType === "video" && playbackId ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-0"
          >
            <source
              src={`https://stream.mux.com/${playbackId}/capped-1080p.mp4`}
              type="video/mp4"
            />
          </video>
        ) : bg?.backgroundType === "image" && bg.image ? (
          <Image
            src={urlFor(bg.image).auto("format").url()}
            alt="Homepage background"
            fill
            priority
            placeholder={bg.image.asset?.metadata?.lqip ? "blur" : "empty"}
            blurDataURL={bg.image.asset?.metadata?.lqip ?? undefined}
            className="object-cover z-0"
          />
        ) : (
          <Image
            src="/images/texture.jpg"
            alt="texture made of images of fabric found in brooklyn"
            fill
            priority
            className="object-cover z-0"
          />
        )}
      </div>
    </div>
  );
}
