import { defineQuery } from 'next-sanity'

// Reusable projection for link objects — resolves reference slugs inline
const linkProjection = `
  text,
  linkType,
  internalPage,
  "pageSlug": pageRef->slug.current,
  "productSlug": productRef->store.slug.current,
  "collectionSlug": collectionRef->store.slug.current,
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

// Reusable projection for SEO fields — asset url is needed for OG image
const seoProjection = `
  seo {
    title,
    description,
    image {
      asset->{ _id, _type, url },
    },
  }
`

export const allProductSlugsQuery = defineQuery(
  `*[_type == "product" && defined(store.slug.current)].store.slug.current`
)

export const allCollectionSlugsQuery = defineQuery(
  `*[_type == "collection" && defined(store.slug.current)].store.slug.current`
)

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
    ${seoProjection},
  }
`)

export const pageBySlugQuery = defineQuery(`
  *[_type == "page" && slug.current == $slug][0] {
    title,
    "slug": slug.current,
    content[] {
      ...,
      _type == "image" => {
        ...,
        asset->
      }
    },
    ${seoProjection},
  }
`)
