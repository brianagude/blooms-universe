"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import SanityLink from "@/components/SanityLink";
import { urlFor } from "@/sanity/lib/image";
import type {
	SanityImageRef,
	SanityLink as SanityLinkType,
} from "@/sanity/types";

type Props = {
	headerLinks?: SanityLinkType[] | null;
	logo?: SanityImageRef | null;
};

export default function Header({ headerLinks, logo }: Props) {
	const [time, setTime] = useState<string>("");

	useEffect(() => {
		const updateTime = () => {
			const now = new Date();
			const usviTime = new Date(
				now.toLocaleString("en-US", { timeZone: "America/St_Thomas" }),
			);
			const timeString = usviTime.toLocaleTimeString("en-US", {
				hour12: true,
				hour: "2-digit",
				minute: "2-digit",
				second: "2-digit",
			});
			setTime(timeString);
		};

		updateTime();
		const interval = setInterval(updateTime, 1000);
		return () => clearInterval(interval);
	}, []);

	const linkClassName =
		"text-base font-extrabold leading-7 tracking-wide md:tracking-wider uppercase";

	return (
		<header className="py-4 relative z-50">
			<div className="px-4 flex justify-between items-center sm:px-10">
				<Link
					href="/"
					className="font-kiante text-2xl leading-tight tracking-wide uppercase"
				>
					{logo ? (
						<Image
							src={urlFor(logo).height(48).auto("format").url()}
							alt="Blooms Universe"
							width={120}
							height={48}
							priority
						/>
					) : (
						"Blooms Universe"
					)}
				</Link>

				{headerLinks && headerLinks.length > 0 && (
					<nav className="gap-7 hidden lg:flex">
						{headerLinks.map((link, i) => (
							<SanityLink key={i} link={link} className={linkClassName} />
						))}
					</nav>
				)}

				<button type="button" className={`${linkClassName} lg:hidden`}>
					Menu
				</button>

				<p className="hidden lg:flex items-end justify-center gap-1 text-base font-extrabold tracking-wide md:tracking-wider uppercase w-36 text-right">
					{time} <span className="!text-2xl !leading-none">🇻🇮</span>
				</p>
			</div>
		</header>
	);
}
