import { defineField, defineType } from 'sanity'

export const settings = defineType({
  name: 'settings',
  title: 'Settings',
  type: 'document',
  groups: [
    { name: 'header', title: 'Header', default: true },
    { name: 'footer', title: 'Footer' },
    { name: 'pageContent', title: 'Page Content' },
  ],
  fields: [
    // ─── Header ──────────────────────────────────────────────────────────────
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: { hotspot: true },
      group: 'header',
    }),
    defineField({
      name: 'headerLinks',
      title: 'Navigation Links',
      type: 'array',
      of: [{ type: 'link' }],
      group: 'header',
    }),

    // ─── Footer ──────────────────────────────────────────────────────────────
    defineField({
      name: 'footerLinks',
      title: 'Footer Links',
      type: 'array',
      of: [{ type: 'link' }],
      group: 'footer',
    }),
    defineField({
      name: 'showNewsletter',
      title: 'Show Newsletter Signup',
      type: 'boolean',
      initialValue: false,
      group: 'footer',
    }),
    defineField({
      name: 'socialMedia',
      title: 'Social Media Profiles',
      type: 'socialMedia',
      group: 'footer',
    }),

    // ─── Page Content ────────────────────────────────────────────────────────
    defineField({
      name: 'homepageBackground',
      title: 'Homepage Background',
      description: 'Video takes priority over image when both are set.',
      type: 'object',
      group: 'pageContent',
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: 'backgroundType',
          title: 'Background Type',
          type: 'string',
          options: {
            list: [
              { title: 'Video (Mux)', value: 'video' },
              { title: 'Image', value: 'image' },
            ],
            layout: 'radio',
          },
          initialValue: 'video',
        }),
        defineField({
          name: 'video',
          title: 'Video',
          type: 'mux.video',
          hidden: ({ parent }) => parent?.backgroundType !== 'video',
        }),
        defineField({
          name: 'image',
          title: 'Image',
          type: 'image',
          options: { hotspot: true },
          hidden: ({ parent }) => parent?.backgroundType !== 'image',
        }),
      ],
    }),
    defineField({
      name: 'aboutImage',
      title: 'About Page Image',
      type: 'image',
      options: { hotspot: true },
      group: 'pageContent',
    }),
    defineField({
      name: 'aboutText',
      title: 'About Page Text',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
            ],
          },
        },
      ],
      group: 'pageContent',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Settings' }),
  },
})
