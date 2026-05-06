'use client'

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...tool]]/page.tsx` route
 */

import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {muxInput} from 'sanity-plugin-mux-input'

import {apiVersion, dataset, projectId} from './src/sanity/env'
import {schema} from './src/sanity/schemaTypes'
import {structure} from './src/sanity/structure'

const SHOPIFY_SYNCED_TYPES = ['product', 'collection']

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  schema,
  plugins: [
    structureTool({structure}),
    visionTool({defaultApiVersion: apiVersion}),
    muxInput(),
  ],
  document: {
    actions: (prev, { schemaType }) => {
      if (SHOPIFY_SYNCED_TYPES.includes(schemaType)) {
        return prev.filter(({ action }) => action !== 'delete' && action !== 'duplicate')
      }
      return prev
    },
    newDocumentOptions: (prev, { creationContext }) => {
      if (creationContext.type === 'global') {
        return prev.filter(({ templateId }) => !SHOPIFY_SYNCED_TYPES.includes(templateId))
      }
      return prev
    },
  },
})
