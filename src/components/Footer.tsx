"use client";

import { useState } from "react";
import NewsletterPopup from "@/components/NewsletterPopup";
import SanityLink from "@/components/SanityLink";
import type {
	NewsletterBlock,
	SanityImageWithLqip,
	SanityLink as SanityLinkType,
	SocialMedia,
} from "@/sanity/types";
import { InstagramIcon } from "./icons/instagram";

type Props = {
	footerCopyright?: string | null;
	footerLinks?: SanityLinkType[] | null;
	socialMedia?: SocialMedia | null;
	showNewsletter?: boolean | null;
	newsletterImage?: (SanityImageWithLqip & { alt?: string }) | null;
	newsletterContent?: NewsletterBlock[] | null;
};

const linkClassName =
	"text-base font-extrabold leading-7 tracking-wide md:tracking-wider uppercase";

export default function Footer({
	footerCopyright,
	footerLinks,
	socialMedia,
	showNewsletter,
	newsletterImage,
	newsletterContent,
}: Props) {
	const [isOpen, setIsOpen] = useState(false);
	const year = new Date().getFullYear();
	const copyright = footerCopyright ?? `© ${year} Blooms Universe LLC`;

	return (
		<>
			{isOpen && showNewsletter && (
				<div
					className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
					onClick={() => setIsOpen(false)}
				>
					<div
						role="dialog"
						aria-modal="true"
						aria-label="Newsletter signup"
						onClick={(e) => e.stopPropagation()}
						onKeyDown={(e) => {
							e.stopPropagation();
							if (e.key === "Escape") setIsOpen(false);
						}}
					>
						<NewsletterPopup
							image={newsletterImage}
							content={newsletterContent}
							onClose={() => setIsOpen(false)}
						/>
					</div>
				</div>
			)}

			<footer className="py-4 relative z-10">
				<div className="px-4 flex justify-between items-center sm:px-10">
					<p className="text-base not-italic font-medium leading-6">
						{copyright}
					</p>
					<div className="flex items-center justify-center flex-wrap gap-6">
						{footerLinks?.map((link) => (
							<SanityLink key={link.text} link={link} className={linkClassName} />
						))}
						{showNewsletter && (
							<button
								type="button"
								className={linkClassName}
								onClick={() => setIsOpen(true)}
							>
								News
							</button>
						)}
						{socialMedia?.instagram && (
							<a
								href={socialMedia.instagram}
								target="_blank"
								rel="noopener noreferrer"
							>
								<InstagramIcon />
							</a>
						)}
					</div>
				</div>
			</footer>
		</>
	);
}
