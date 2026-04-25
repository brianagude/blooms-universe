import { createElement } from 'react'
import { defineField, defineType } from 'sanity'

export const collection = defineType({
  name: 'collection',
  title: 'Collections',
  type: 'document',
  fields: [
    defineField({
      name: 'store',
      title: 'Shopify Data',
      type: 'object',
      readOnly: true,
      fields: [
        defineField({ name: 'title', title: 'Title', type: 'string' }),
        defineField({ name: 'descriptionHtml', title: 'Description', type: 'text' }),
        defineField({ name: 'imageUrl', title: 'Collection Image', type: 'url' }),
        defineField({ name: 'sortOrder', title: 'Sort Order', type: 'string' }),
        defineField({ name: 'slug', title: 'Slug', type: 'slug' }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'store.title',
      subtitle: 'store.slug.current',
      imageUrl: 'store.imageUrl',
    },
    prepare({ title, subtitle, imageUrl }: { title?: string; subtitle?: string; imageUrl?: string }) {
      return {
        title: title ?? 'Untitled Collection',
        subtitle: subtitle ? `/${subtitle}` : undefined,
        media: imageUrl
          ? createElement('img', {
              src: imageUrl,
              alt: title ?? '',
              style: { width: '100%', height: '100%', objectFit: 'cover' },
            })
          : undefined,
      }
    },
  },
})
