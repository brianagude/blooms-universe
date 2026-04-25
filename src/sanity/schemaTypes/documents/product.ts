import { defineField, defineType } from 'sanity'

export const product = defineType({
  name: 'product',
  title: 'Products',
  type: 'document',
  fields: [
    defineField({
      name: 'store',
      title: 'Shopify Data',
      type: 'object',
      readOnly: true,
      fields: [
        defineField({ name: 'title', title: 'Title', type: 'string' }),
        defineField({ name: 'status', title: 'Status', type: 'string' }),
        defineField({ name: 'vendor', title: 'Vendor', type: 'string' }),
        defineField({ name: 'productType', title: 'Product Type', type: 'string' }),
        defineField({ name: 'tags', title: 'Tags', type: 'string' }),
        defineField({
          name: 'slug',
          title: 'Slug',
          type: 'slug',
        }),
        defineField({
          name: 'priceRange',
          title: 'Price Range',
          type: 'object',
          fields: [
            defineField({ name: 'minVariantPrice', title: 'Min Price', type: 'number' }),
            defineField({ name: 'maxVariantPrice', title: 'Max Price', type: 'number' }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'store.title',
      subtitle: 'store.status',
    },
    prepare({ title, subtitle }) {
      return {
        title: title ?? 'Untitled Product',
        subtitle: subtitle ? `Status: ${subtitle}` : undefined,
      }
    },
  },
})
