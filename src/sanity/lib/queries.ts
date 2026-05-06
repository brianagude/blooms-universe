import { defineQuery } from 'next-sanity'

// Reusable projection for link objects — resolves reference slugs inline
const linkProjection = `
  text,
  linkType,
  internalPage,
  "pageSlug": pageRef->slug.current,
  "productSlug": productRef->slug.current,
  "collectionSlug": collectionRef->slug.current,
  url,
  email,
  phone,
`

// Reusable projection for display images — resolves asset for urlFor + lqip blur placeholder
const imageProjection = `
  _type,
  hotspot,
  crop,
  asset->{ _id, _type, metadata { lqip } },
`

export const homepageBackgroundQuery = defineQuery(`
  *[_type == "settings"][0].homepageBackground {
    backgroundType,
    video {
      asset->
    },
    image {
      ${imageProjection}
    },
  }
`)

export const settingsQuery = defineQuery(`
  *[_type == "settings"][0] {
    logo,
    headerLinks[] {
      ${linkProjection}
    },
    footerCopyright,
    footerLinks[] {
      ${linkProjection}
    },
    socialMedia,
    showNewsletter,
    newsletterImage {
      alt,
      ${imageProjection}
    },
    newsletterContent[] {
      ...,
      _type == "image" => {
        ...,
        asset->
      }
    },
    homepageBackground {
      backgroundType,
      video {
        asset->
      },
      image {
        ${imageProjection}
      },
    },
  }
`)
