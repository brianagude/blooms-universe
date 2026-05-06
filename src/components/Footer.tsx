"use client";

import { useState } from "react";
import { InstagramIcon } from "./icons/instagram";
import SanityLink from "@/components/SanityLink";
import NewsletterPopup from "@/components/NewsletterPopup";
import type { SanityLink as SanityLinkType, SocialMedia, NewsletterBlock, SanityImageWithLqip } from "@/sanity/types";

type Props = {
  footerCopyright?: string | null;
  footerLinks?: SanityLinkType[] | null;
  socialMedia?: SocialMedia | null;
  showNewsletter?: boolean | null;
  newsletterImage?: (SanityImageWithLqip & { alt?: string }) | null;
  newsletterContent?: NewsletterBlock[] | null;
};

const linkClassName = "text-base font-extrabold leading-7 tracking-wide md:tracking-wider uppercase";

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
          <div onClick={(e) => e.stopPropagation()}>
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
          <p className="text-base not-italic font-medium leading-6">{copyright}</p>
          <div className="flex items-center justify-center flex-wrap gap-6">
            {footerLinks?.map((link, i) => (
              <SanityLink key={i} link={link} className={linkClassName} />
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
              <a href={socialMedia.instagram} target="_blank" rel="noopener noreferrer">
                <InstagramIcon />
              </a>
            )}
          </div>
        </div>
      </footer>
    </>
  );
}
