import type { StructureResolver } from 'sanity/structure'
import { CogIcon } from '@sanity/icons'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // Settings singleton — always a single document
      S.listItem()
        .title('Settings')
        .icon(CogIcon)
        .child(
          S.document()
            .schemaType('settings')
            .documentId('siteSettings')
        ),

      S.divider(),

      // Custom pages
      S.listItem()
        .title('Pages')
        .child(S.documentTypeList('page').title('Pages')),

      S.divider(),

      // Shopify sync — view only, managed by Sanity Connect
      S.listItem()
        .title('Products')
        .child(
          S.documentTypeList('product')
            .title('Products')
            .defaultOrdering([{ field: 'store.status', direction: 'asc' }])
        ),

      S.listItem()
        .title('Collections')
        .child(
          S.documentTypeList('collection')
            .title('Collections')
            .defaultOrdering([{ field: 'store.title', direction: 'asc' }])
        ),
    ])
