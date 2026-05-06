import { defineField, defineType } from 'sanity'

export const seo = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'SEO Title',
      type: 'string',
      description: 'Overrides the page title in search results and browser tab.',
      validation: (Rule) => Rule.max(70).warning('Keep under 70 characters for best results.'),
    }),
    defineField({
      name: 'description',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description: 'Appears in search result snippets.',
      validation: (Rule) => Rule.max(160).warning('Keep under 160 characters for best results.'),
    }),
    defineField({
      name: 'image',
      title: 'Social Share Image',
      type: 'image',
      description: 'Used for Open Graph / Twitter card previews. Recommended: 1200×630px.',
      options: { hotspot: true },
    }),
  ],
})
