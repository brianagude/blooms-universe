import { defineField, defineType } from 'sanity'

export const settings = defineType({
  name: 'settings',
  title: 'Settings',
  type: 'document',
  groups: [
    { name: 'header', title: 'Header', default: true },
    { name: 'footer', title: 'Footer' },
    { name: 'news', title: 'Newsletter' },
    { name: 'homePage', title: 'Home Page' },
    { name: 'seo', title: 'SEO' },
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
      name: 'footerCopyright',
      title: 'Footer Copyright text',
      type: 'string',
      group: 'footer',
    }),
    defineField({
      name: 'footerLinks',
      title: 'Footer Links',
      type: 'array',
      of: [{ type: 'link' }],
      group: 'footer',
    }),
    defineField({
      name: 'socialMedia',
      title: 'Social Media Profiles',
      type: 'socialMedia',
      group: 'footer',
    }),

    // ─── Newsletter ──────────────────────────────────────────────────────────
    defineField({
      name: 'showNewsletter',
      title: 'Show Newsletter Signup',
      type: 'boolean',
      initialValue: false,
      group: 'news',
    }),
    defineField({
      name: 'newsletterContent',
      title: 'Newsletter Content',
      description: 'Text displayed alongside the newsletter signup form.',
      hidden: ({ document }) => !document?.showNewsletter,
      group: 'news',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  defineField({ name: 'href', title: 'URL', type: 'url' }),
                ],
              },
            ],
          },
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({ name: 'alt', title: 'Alt Text', type: 'string' }),
            defineField({ 
              name: 'width', 
              title: 'Max Width', 
              type: 'number',
              options: {
                list: [
                  {title: '120px', value: 120},
                  {title: '200px', value: 200},
                  {title: '320px', value: 320},
                ]
              }
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'newsletterImage',
      title: 'Newsletter Image',
      description: 'Decorative image displayed above the signup form.',
      type: 'image',
      options: { hotspot: true },
      hidden: ({ document }) => !document?.showNewsletter,
      fields: [
        defineField({ name: 'alt', title: 'Alt Text', type: 'string' }),
      ],
      group: 'news',
    }),
    // ─── Home Page ───────────────────────────────────────────────────────────
    defineField({
      name: 'homepageBackground',
      title: 'Homepage Background',
      description: 'Video takes priority over image when both are set.',
      type: 'object',
      group: 'homePage',
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

    // ─── SEO ─────────────────────────────────────────────────────────────────
    defineField({
      name: 'seo',
      title: 'Global SEO Defaults',
      type: 'seo',
      description: 'Fallback SEO values used when a page has no SEO fields set.',
      group: 'seo',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Settings' }),
  },
})
