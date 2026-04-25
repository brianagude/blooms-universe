import { type SchemaTypeDefinition } from 'sanity'

// Documents
import { settings } from './documents/settings'
import { page } from './documents/page'
import { product } from './documents/product'
import { collection } from './documents/collection'

// Objects
import { link } from './objects/link'
import { socialMedia } from './objects/socialMedia'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Documents
    settings,
    page,
    product,
    collection,
    // Objects
    link,
    socialMedia,
  ],
}
