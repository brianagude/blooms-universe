import { defineField, defineType } from 'sanity'

export const link = defineType({
  name: 'link',
  title: 'Link',
  type: 'object',
  preview: {
    select: {
      title: 'text',
      subtitle: 'linkType',
    },
  },
  fields: [
    defineField({
      name: 'text',
      title: 'Link Text',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'linkType',
      title: 'Link Type',
      type: 'string',
      options: {
        list: [
          { title: 'Internal Page', value: 'internal' },
          { title: 'External URL', value: 'external' },
          { title: 'Email', value: 'email' },
          { title: 'Phone', value: 'phone' },
        ],
        layout: 'radio',
      },
      initialValue: 'internal',
      validation: (Rule) => Rule.required(),
    }),

    // --- Internal ---
    defineField({
      name: 'internalPage',
      title: 'Page',
      type: 'string',
      options: {
        list: [
          { title: 'Home', value: '/' },
          { title: 'Contact', value: '/contact' },
          { title: 'Custom Page', value: 'page' },
          { title: 'Specific Product', value: 'product' },
          { title: 'Specific Collection', value: 'collection' },
        ],
      },
      hidden: ({ parent }) => parent?.linkType !== 'internal',
    }),
    defineField({
      name: 'pageRef',
      title: 'Page',
      type: 'reference',
      to: [{ type: 'page' }],
      hidden: ({ parent }) =>
        parent?.linkType !== 'internal' || parent?.internalPage !== 'page',
    }),
    defineField({
      name: 'productRef',
      title: 'Product',
      type: 'reference',
      to: [{ type: 'product' }],
      hidden: ({ parent }) =>
        parent?.linkType !== 'internal' || parent?.internalPage !== 'product',
    }),
    defineField({
      name: 'collectionRef',
      title: 'Collection',
      type: 'reference',
      to: [{ type: 'collection' }],
      hidden: ({ parent }) =>
        parent?.linkType !== 'internal' || parent?.internalPage !== 'collection',
    }),

    // --- External ---
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      hidden: ({ parent }) => parent?.linkType !== 'external',
      validation: (Rule) =>
        Rule.uri({ allowRelative: false, scheme: ['http', 'https'] }),
    }),

    // --- Email ---
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
      hidden: ({ parent }) => parent?.linkType !== 'email',
    }),

    // --- Phone ---
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      hidden: ({ parent }) => parent?.linkType !== 'phone',
    }),
  ],
})
