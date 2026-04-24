"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
	const [time, setTime] = useState<string>("");

	useEffect(() => {
		const updateTime = () => {
			const now = new Date();
			// USVI is in the Atlantic Time Zone (UTC-4)
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

		// Update immediately
		updateTime();

		// Update every second
		const interval = setInterval(updateTime, 1000);

		// Cleanup on unmount
		return () => clearInterval(interval);
	}, []);

	return (
		<header className="py-4 relative z-50">
			<div className="px-4 flex justify-between items-center sm:px-10">
				<Link
					href="/"
					className="font-kiante text-2xl leading-tight tracking-wide uppercase"
				>
					Blooms Universe
				</Link>
				<nav className="gap-7 hidden lg:flex">
					<Link href="/" className="text-base font-extrabold leading-7 tracking-wide md:tracking-wider uppercase">Store</Link>
					<Link href="/about" className="text-base font-extrabold leading-7 tracking-wide md:tracking-wider uppercase">About</Link>
					<Link href="/" className="text-base font-extrabold leading-7 tracking-wide md:tracking-wider uppercase">Contact</Link>
					<a href="/" target="_blank" rel="noopener" className="text-base font-extrabold leading-7 tracking-wide md:tracking-wider uppercase">Account</a>
					<button type="button"  className="text-base font-extrabold leading-7 tracking-wide md:tracking-wider uppercase">Cart</button>
				</nav>
				<button type="button" className="text-base font-extrabold tracking-wide md:tracking-wider uppercase lg:hidden">Menu</button>
				<p className="hidden lg:flex items-end justify-center gap-1 text-base font-extrabold tracking-wide md:tracking-wider uppercase w-36 text-right">
					{time} <span className="!text-2xl !leading-none">🇻🇮</span>
				</p>
			</div>
		</header>
	);
}
