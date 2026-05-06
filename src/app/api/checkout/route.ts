import { NextRequest, NextResponse } from 'next/server'
import { createCheckout } from '@/lib/shopify'
import type { CheckoutLineItem } from '@/lib/shopify-types'

export async function POST(req: NextRequest) {
  try {
    const { lineItems } = (await req.json()) as { lineItems: CheckoutLineItem[] }

    if (!Array.isArray(lineItems) || lineItems.length === 0) {
      return NextResponse.json({ error: 'No items in cart' }, { status: 400 })
    }

    const url = await createCheckout(lineItems)
    return NextResponse.json({ url })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Checkout failed'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
