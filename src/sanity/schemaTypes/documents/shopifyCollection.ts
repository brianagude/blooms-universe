import { defineField, defineType } from 'sanity'

export const shopifyCollection = defineType({
  name: 'shopifyCollection',
  title: 'Collections',
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
        defineField({ name: 'isDeleted', title: 'Deleted in Shopify', type: 'boolean' }),
        defineField({
          name: 'imageUrl',
          title: 'Collection Image URL',
          type: 'url',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'store.title',
      subtitle: 'store.handle',
    },
    prepare({ title, subtitle }) {
      return {
        title: title ?? 'Untitled Collection',
        subtitle: subtitle ? `/${subtitle}` : undefined,
      }
    },
  },
})
