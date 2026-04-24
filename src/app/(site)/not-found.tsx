import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
	return (
		<div className="p-4 h-full flex-1 flex flex-col items-center justify-center">
			<div className="text-center flex flex-col items-center justify-center gap-4 md:gap-6">
        <Image
          src="/images/not-found.jpg"
          alt="animated flower image"
          width={200}
          height={200}
          className="rounded-2xl"
        />
				<p className="md:text-2xl">
					Oops! This page doesn&apos;t exist.
					<br />
					Let&apos;s get you back to safety.
				</p>
			</div>
			<Link
				href="/"
				className="flex px-6 py-4 justify-center items-center gap-2 rounded-xl bg-green text-white font-colby text-md font-semibold leading-[1.1] uppercase mt-6 hover:bg-green-light transition-all sm:w-fit sm:mx-auto md:mt-10"
			>
				Return Home
			</Link>
		</div>
	);
}