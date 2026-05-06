import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import Cart from "@/components/Cart";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { TailwindHelper } from "@/components/TailwindHelper";
import { SanityLive, sanityFetch } from "@/sanity/lib/live";
import { settingsQuery } from "@/sanity/lib/queries";

const SITE_URL = "https://www.bloomsuniverse.com";

const DEFAULT_TITLE =
	"Blooms Universe | Fine Gold Jewelry Inspired by Caribbean Heritage";
const DEFAULT_DESCRIPTION =
	"Blooms Universe creates fine gold jewelry inspired by the founder's Caribbean roots, blending island heritage, cultural storytelling, and New York sophistication into timeless handcrafted pieces.";
const DEFAULT_OG_DESCRIPTION =
	"Discover handcrafted gold jewelry that embodies Caribbean culture and luxury craftsmanship. Blooms Universe celebrates heritage, beauty, and timeless design.";

export async function generateMetadata(): Promise<Metadata> {
	const { data: settings } = await sanityFetch({ query: settingsQuery });
	const seo = settings?.seo;

	const title = seo?.title || DEFAULT_TITLE;
	const description = seo?.description || DEFAULT_DESCRIPTION;
	const ogImageUrl = seo?.image?.asset?.url ?? undefined;

	return {
		metadataBase: new URL(SITE_URL),
		title: {
			default: title,
			template: "%s | Blooms Universe",
		},
		description,
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
			{ name: "Blooms Universe", url: SITE_URL },
		],
		creator: "Blooms Universe",
		publisher: "Blooms Universe",
		openGraph: {
			type: "website",
			url: SITE_URL,
			siteName: "Blooms Universe",
			locale: "en_US",
			title,
			description: seo?.description || DEFAULT_OG_DESCRIPTION,
			...(ogImageUrl && { images: [{ url: ogImageUrl }] }),
		},
		twitter: {
			card: "summary_large_image",
			title,
			description,
			...(ogImageUrl && { images: [ogImageUrl] }),
		},
		manifest: "/site.webmanifest",
		category: "luxury goods",
	};
}

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
			<Cart />
			<SanityLive />
			<Analytics />
		</>
	);
}
