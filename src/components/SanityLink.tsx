import Link from "next/link";
import type { SanityLink as SanityLinkType } from "@/sanity/types";

function resolveHref(link: SanityLinkType): string {
  switch (link.linkType) {
    case "internal":
      switch (link.internalPage) {
        case "home":      return "/";
        case "page":      return link.pageSlug       ? `/${link.pageSlug}`               : "/";
        case "product":   return link.productSlug    ? `/products/${link.productSlug}`   : "/";
        case "collection":return link.collectionSlug ? `/collections/${link.collectionSlug}` : "/";
        default:          return "/";
      }
    case "external": return link.url   ?? "#";
    case "email":    return `mailto:${link.email ?? ""}`;
    case "phone":    return `tel:${link.phone ?? ""}`;
    default:         return "/";
  }
}

type Props = {
  link: SanityLinkType;
  className?: string;
};

export default function SanityLink({ link, className }: Props) {
  const href = resolveHref(link);

  // External links open in a new tab; email and phone use plain <a> since
  // Next.js Link doesn't handle non-http schemes.
  if (link.linkType !== "internal") {
    return (
      <a
        href={href}
        className={className}
        {...(link.linkType === "external"
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {link.text}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {link.text}
    </Link>
  );
}
