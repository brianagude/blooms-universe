export type ShopifyImage = {
  url: string
  altText: string | null
  width: number
  height: number
}

export type ShopifySelectedOption = {
  name: string
  value: string
}

export type ShopifyVariant = {
  id: string
  title: string
  availableForSale: boolean
  price: {
    amount: string
    currencyCode: string
  }
  compareAtPrice: {
    amount: string
    currencyCode: string
  } | null
  selectedOptions: ShopifySelectedOption[]
  image: ShopifyImage | null
}

export type ShopifyOption = {
  id: string
  name: string
  values: string[]
}

export type ShopifySeo = {
  title: string | null
  description: string | null
}

export type ShopifyMetafield = {
  namespace: string
  key: string
  value: string
  type: string
}

export type ShopifyProduct = {
  id: string
  handle: string
  title: string
  descriptionHtml: string
  availableForSale: boolean
  featuredImage: ShopifyImage | null
  images: { edges: Array<{ node: ShopifyImage }> }
  options: ShopifyOption[]
  variants: { edges: Array<{ node: ShopifyVariant }> }
  priceRange: {
    minVariantPrice: { amount: string; currencyCode: string }
    maxVariantPrice: { amount: string; currencyCode: string }
  }
  seo: ShopifySeo
  collections: { edges: Array<{ node: { title: string; handle: string } }> }
  metafields: Array<ShopifyMetafield | null>
}

export type ShopifyCollectionProduct = {
  id: string
  handle: string
  title: string
  availableForSale: boolean
  featuredImage: ShopifyImage | null
  priceRange: {
    minVariantPrice: { amount: string; currencyCode: string }
    maxVariantPrice: { amount: string; currencyCode: string }
  }
}

export type ShopifyCollection = {
  id: string
  handle: string
  title: string
  descriptionHtml: string
  image: ShopifyImage | null
  products: { edges: Array<{ node: ShopifyCollectionProduct }> }
  seo: ShopifySeo
}

export type CheckoutLineItem = {
  variantId: string
  quantity: number
}
