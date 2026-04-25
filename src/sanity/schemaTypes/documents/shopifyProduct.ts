import { defineField, defineType } from 'sanity'

export const shopifyProduct = defineType({
  name: 'shopifyProduct',
  title: 'Products',
  type: 'document',
  // Synced from Shopify via Sanity Connect — do not edit manually
  __experimental_formPreviewTitle: false,
  fields: [
    defineField({
      name: 'store',
      title: 'Shopify Data',
      type: 'object',
      readOnly: true,
      fields: [
        defineField({ name: 'id', title: 'Shopify ID', type: 'number' }),
        defineField({ name: 'gid', title: 'GID', type: 'string' }),
        defineField({ name: 'title', title: 'Title', type: 'string' }),
        defineField({ name: 'handle', title: 'Handle / Slug', type: 'string' }),
        defineField({ name: 'descriptionHtml', title: 'Description (HTML)', type: 'text' }),
        defineField({ name: 'status', title: 'Status', type: 'string' }),
        defineField({ name: 'vendor', title: 'Vendor', type: 'string' }),
        defineField({ name: 'productType', title: 'Product Type', type: 'string' }),
        defineField({ name: 'tags', title: 'Tags', type: 'string' }),
        defineField({
          name: 'priceRange',
          title: 'Price Range',
          type: 'object',
          fields: [
            defineField({ name: 'minVariantPrice', title: 'Min Price', type: 'number' }),
            defineField({ name: 'maxVariantPrice', title: 'Max Price', type: 'number' }),
          ],
        }),
        defineField({
          name: 'previewImageUrl',
          title: 'Preview Image URL',
          type: 'url',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'store.title',
      subtitle: 'store.status',
      media: 'store.previewImageUrl',
    },
    prepare({ title, subtitle }) {
      return {
        title: title ?? 'Untitled Product',
        subtitle: subtitle ? `Status: ${subtitle}` : undefined,
      }
    },
  },
})
