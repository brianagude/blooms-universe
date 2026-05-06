import type {
  CheckoutLineItem,
  ShopifyCollection,
  ShopifyProduct,
} from './shopify-types'

const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!
const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!
const endpoint = `https://${domain}/api/2024-10/graphql.json`

async function shopifyFetch<T>(
  query: string,
  variables?: Record<string, unknown>,
): Promise<T> {
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': token,
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 60 },
  })

  if (!res.ok) throw new Error(`Shopify fetch failed: ${res.statusText}`)

  const json = await res.json()
  if (json.errors?.length) throw new Error(json.errors[0].message)
  return json.data as T
}

// ── Queries ───────────────────────────────────────────────────────────────────

const IMAGE_FRAGMENT = `
  url
  altText
  width
  height
`

const PRODUCT_BY_HANDLE_QUERY = `
  query ProductByHandle($handle: String!) {
    product(handle: $handle) {
      id
      handle
      title
      descriptionHtml
      availableForSale
      featuredImage { ${IMAGE_FRAGMENT} }
      images(first: 20) {
        edges { node { ${IMAGE_FRAGMENT} } }
      }
      options {
        id
        name
        values
      }
      variants(first: 100) {
        edges {
          node {
            id
            title
            availableForSale
            price { amount currencyCode }
            compareAtPrice { amount currencyCode }
            selectedOptions { name value }
            image { ${IMAGE_FRAGMENT} }
          }
        }
      }
      priceRange {
        minVariantPrice { amount currencyCode }
        maxVariantPrice { amount currencyCode }
      }
    }
  }
`

const COLLECTION_BY_HANDLE_QUERY = `
  query CollectionByHandle($handle: String!) {
    collection(handle: $handle) {
      id
      handle
      title
      descriptionHtml
      image { ${IMAGE_FRAGMENT} }
      products(first: 50) {
        edges {
          node {
            id
            handle
            title
            availableForSale
            featuredImage { ${IMAGE_FRAGMENT} }
            priceRange {
              minVariantPrice { amount currencyCode }
              maxVariantPrice { amount currencyCode }
            }
          }
        }
      }
    }
  }
`

const CHECKOUT_CREATE_MUTATION = `
  mutation CheckoutCreate($lineItems: [CheckoutLineItemInput!]!) {
    checkoutCreate(input: { lineItems: $lineItems }) {
      checkout {
        id
        webUrl
      }
      checkoutUserErrors {
        field
        message
      }
    }
  }
`

// ── Exported helpers ──────────────────────────────────────────────────────────

export async function getProductByHandle(
  handle: string,
): Promise<ShopifyProduct | null> {
  const data = await shopifyFetch<{ product: ShopifyProduct | null }>(
    PRODUCT_BY_HANDLE_QUERY,
    { handle },
  )
  return data.product
}

export async function getCollectionByHandle(
  handle: string,
): Promise<ShopifyCollection | null> {
  const data = await shopifyFetch<{ collection: ShopifyCollection | null }>(
    COLLECTION_BY_HANDLE_QUERY,
    { handle },
  )
  return data.collection
}

export async function createCheckout(
  lineItems: CheckoutLineItem[],
): Promise<string> {
  const data = await shopifyFetch<{
    checkoutCreate: {
      checkout: { webUrl: string } | null
      checkoutUserErrors: Array<{ field: string[]; message: string }>
    }
  }>(CHECKOUT_CREATE_MUTATION, { lineItems })

  const { checkout, checkoutUserErrors } = data.checkoutCreate
  if (checkoutUserErrors.length > 0) {
    throw new Error(checkoutUserErrors[0].message)
  }
  if (!checkout?.webUrl) throw new Error('Checkout creation failed')
  return checkout.webUrl
}
