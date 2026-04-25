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
        defineField({ name: 'sortOrder', title: 'Sort Order', type: 'string' }),
        defineField({
          name: 'slug',
          title: 'Slug',
          type: 'slug',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'store.title',
      subtitle: 'store.slug.current',
    },
    prepare({ title, subtitle }) {
      return {
        title: title ?? 'Untitled Collection',
        subtitle: subtitle ? `/${subtitle}` : undefined,
      }
    },
  },
})
