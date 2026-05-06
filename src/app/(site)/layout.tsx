import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import Image from "next/image";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { TailwindHelper } from "@/components/TailwindHelper";
import { SanityLive, sanityFetch } from "@/sanity/lib/live";
import { settingsQuery } from "@/sanity/lib/queries";

export const metadata: Metadata = {
	metadataBase: new URL("https://www.bloomsuniverse.com"),
	title: {
		default:
			"Blooms Universe | Fine Gold Jewelry Inspired by Caribbean Heritage",
		template: "%s | Blooms Universe",
	},
	description:
		"Blooms Universe creates fine gold jewelry inspired by the founder's Caribbean roots, blending island heritage, cultural storytelling, and New York sophistication into timeless handcrafted pieces.",
	applicationName: "Blooms Universe",
	keywords: [
		"fine jewelry",
		"gold jewelry",
		"Caribbean jewelry",
		"luxury jewelry",
		"handcrafted gold",
		"Blooms Universe",
		"ethical gold",
		"St. Thomas VI jewelry",
		"heritage jewelry",
		"New York jewelry brand",
	],
	authors: [
		{ name: "Briana Gude", url: "https://www.brianagude.com" },
		{ name: "Blooms Universe", url: "https://www.bloomsuniverse.com" },
	],
	creator: "Blooms Universe",
	publisher: "Blooms Universe",
	openGraph: {
		type: "website",
		url: "https://www.bloomsuniverse.com",
		title: "Blooms Universe | Fine Gold Jewelry Inspired by Caribbean Heritage",
		description:
			"Discover handcrafted gold jewelry that embodies Caribbean culture and luxury craftsmanship. Blooms Universe celebrates heritage, beauty, and timeless design.",
		siteName: "Blooms Universe",
		locale: "en_US",
	},
	twitter: {
		card: "summary_large_image",
		title: "Blooms Universe | Fine Gold Jewelry Inspired by Caribbean Heritage",
		description:
			"Handcrafted gold jewelry inspired by Caribbean tradition and refined in New York. Wearing gold is wearing a story.",
	},
	manifest: "/site.webmanifest",
	category: "luxury goods",
};

export default async function SiteLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const { data: settings } = await sanityFetch({ query: settingsQuery });

	return (
		<>
			<Header headerLinks={settings?.headerLinks} logo={settings?.logo} />
			<main className="h-full flex flex-col flex-1 relative z-20">
				{children}
			</main>
			{process.env.NODE_ENV === "development" && <TailwindHelper />}
			<Footer
				footerCopyright={settings?.footerCopyright}
				footerLinks={settings?.footerLinks}
				socialMedia={settings?.socialMedia}
				showNewsletter={settings?.showNewsletter}
				newsletterImage={settings?.newsletterImage}
				newsletterContent={settings?.newsletterContent}
			/>
			<Image src="/images/background.jpg" alt="paper texture" fill />
			<SanityLive />
			<Analytics />
		</>
	);
}
