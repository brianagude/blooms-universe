import type { StructureResolver } from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // Shopify sync (read-only, managed by Sanity Connect)
      S.listItem()
        .title('Products')
        .child(S.documentTypeList('product').title('Products')),

      S.listItem()
        .title('Collections')
        .child(S.documentTypeList('collection').title('Collections')),

      S.divider(),

      // Settings singleton — always a single document
      S.listItem()
        .title('Settings')
        .child(
          S.document()
            .schemaType('settings')
            .documentId('siteSettings')
        ),
    ])
