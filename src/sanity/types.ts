// Sanity image asset reference (unresolved — used with @sanity/image-url)
export type SanityImageRef = {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  hotspot?: { x: number; y: number; height: number; width: number }
  crop?: { top: number; bottom: number; left: number; right: number }
}

// Image with asset resolved — provides lqip for blur placeholder + works with urlFor via _id
export type SanityImageWithLqip = {
  _type: 'image'
  asset: {
    _id: string
    _type: string
    metadata?: {
      lqip?: string
    }
  }
  hotspot?: { x: number; y: number; height: number; width: number }
  crop?: { top: number; bottom: number; left: number; right: number }
}

export type SanitySeo = {
  title?: string | null
  description?: string | null
  image?: {
    asset?: {
      _id: string
      _type: string
      url: string
    } | null
  } | null
}

// Resolved link object — reference slugs are projected inline by the GROQ query
export type SanityLink = {
  text: string
  linkType: 'internal' | 'external' | 'email' | 'phone'
  // Only present when linkType === 'internal'
  internalPage?: '/' | 'page' | 'product' | 'collection' | null
  pageSlug?: string | null
  productSlug?: string | null
  collectionSlug?: string | null
  // Only present when linkType === 'external'
  url?: string | null
  // Only present when linkType === 'email'
  email?: string | null
  // Only present when linkType === 'phone'
  phone?: string | null
}

export type SocialMedia = {
  instagram?: string | null
  facebook?: string | null
  twitter?: string | null
  tiktok?: string | null
  pinterest?: string | null
  youtube?: string | null
  linkedin?: string | null
}

// ── Portable Text (newsletter content) ───────────────────────────────────────

type PortableTextMarkDef = {
  _key: string
  _type: string
  [key: string]: unknown
}

type PortableTextSpan = {
  _type: 'span'
  _key: string
  text: string
  marks?: string[]
}

type PortableTextBlock = {
  _type: 'block'
  _key: string
  style?: 'normal' | 'h2' | 'h3' | 'h4'
  children: PortableTextSpan[]
  markDefs?: PortableTextMarkDef[]
}

// Image blocks inside portable text have asset-> resolved
export type PortableTextImage = {
  _type: 'image'
  _key: string
  alt?: string
  width?: number
  asset: {
    _id: string
    _type: string
    url: string
    metadata?: {
      dimensions: { width: number; height: number }
    }
  }
  hotspot?: { x: number; y: number; height: number; width: number }
  crop?: { top: number; bottom: number; left: number; right: number }
}

export type NewsletterBlock = PortableTextBlock | PortableTextImage

// ── Homepage background ───────────────────────────────────────────────────────

type MuxVideoAsset = {
  _id: string
  _type: 'mux.videoAsset'
  playbackId?: string
  status?: string
  data?: {
    playback_ids?: Array<{ id: string; policy: string }>
  }
}

export type HomepageBackground = {
  backgroundType: 'video' | 'image'
  video?: {
    asset?: MuxVideoAsset
  }
  image?: SanityImageWithLqip
}

// ── Top-level settings ────────────────────────────────────────────────────────

export type Settings = {
  logo?: SanityImageRef | null
  headerLinks?: SanityLink[] | null
  footerCopyright?: string | null
  footerLinks?: SanityLink[] | null
  socialMedia?: SocialMedia | null
  showNewsletter?: boolean | null
  newsletterImage?: (SanityImageWithLqip & { alt?: string }) | null
  newsletterContent?: NewsletterBlock[] | null
  homepageBackground?: HomepageBackground | null
  seo?: SanitySeo | null
}
