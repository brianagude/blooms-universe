import type { Metadata } from "next";
import { Barlow } from "next/font/google";
import localFont from "next/font/local";
import "@/styles/globals.css";

const barlow = Barlow({
	variable: "--font-barlow",
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700", "800"],
});

const colby = localFont({
	variable: "--font-colby",
	src: [
		{
			path: "./fonts/colby-wdblk.woff2",
			weight: "400",
			style: "normal",
		},
	],
});

const kiante = localFont({
	variable: "--font-kiante",
	src: [
		{
			path: "./fonts/flipkeys-regular.woff2",
			weight: "400",
			style: "normal",
		},
		{
			path: "./fonts/flipkeys-regular.woff",
			weight: "400",
			style: "normal",
		},
	],
});

export const metadata: Metadata = {
	metadataBase: new URL("https://www.bloomsuniverse.com"),
	title: {
		default: "Admin | Blooms Universe",
		template: "%s | Blooms Universe",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			className={`${barlow.variable} ${kiante.variable} ${colby.variable} antialiased min-h-full`}
		>
			<body className="antialiased min-h-svh flex flex-col relative">
				{children}
			</body>
		</html>
	);
}
