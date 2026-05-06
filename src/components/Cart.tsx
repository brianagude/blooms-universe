"use client";

import Image from "next/image";
import { useState } from "react";
import { selectSubtotal, useCart } from "@/store/cart";

export default function Cart() {
	const { items, isOpen, closeCart, removeItem, updateQuantity } = useCart();
	const subtotal = useCart(selectSubtotal);
	const [isCheckingOut, setIsCheckingOut] = useState(false);
	const [checkoutError, setCheckoutError] = useState<string | null>(null);

	const currencyCode = items[0]?.currencyCode ?? "USD";

	const handleCheckout = async () => {
		setIsCheckingOut(true);
		setCheckoutError(null);
		try {
			const res = await fetch("/api/checkout", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					lineItems: items.map((item) => ({
						variantId: item.variantId,
						quantity: item.quantity,
					})),
				}),
			});
			const data = await res.json();
			if (data.error) throw new Error(data.error);
			window.location.href = data.url;
		} catch (err) {
			setCheckoutError(err instanceof Error ? err.message : "Checkout failed");
			setIsCheckingOut(false);
		}
	};

	if (!isOpen) return null;

	return (
		<>
			{/* Backdrop */}
			<div className="fixed inset-0 z-50" onClick={closeCart} />

			{/* Drawer */}
			<div
				role="dialog"
				aria-modal="true"
				aria-label="Shopping cart"
				className="fixed right-0 top-0 h-full z-50 overflow-y-auto flex flex-col p-4"
				onKeyDown={(e) => {
					if (e.key === "Escape") closeCart();
				}}
			>
				<div className="flex items-center justify-between">
					<h2>Cart</h2>
					<button type="button" onClick={closeCart} aria-label="Close cart">
						CLOSE
					</button>
				</div>

				<div className="grid gap-6">
					{items.length === 0 ? (
						<p>Your cart is empty.</p>
					) : (
						<>
							<ul>
								{items.map((item) => (
									<li key={item.variantId}>
										{item.image && (
											<Image
												src={item.image}
												alt={item.title}
												width={80}
												height={80}
											/>
										)}

										<div>
											<p>{item.title}</p>
											{item.variantTitle !== "Default Title" && (
												<p>{item.variantTitle}</p>
											)}
											<p>
												{currencyCode}{" "}
												{(
													Number.parseFloat(item.price) * item.quantity
												).toFixed(2)}
											</p>
										</div>

										<div>
											<button
												type="button"
												aria-label="Decrease quantity"
												onClick={() =>
													updateQuantity(item.variantId, item.quantity - 1)
												}
											>
												−
											</button>
											<span>{item.quantity}</span>
											<button
												type="button"
												aria-label="Increase quantity"
												onClick={() =>
													updateQuantity(item.variantId, item.quantity + 1)
												}
											>
												+
											</button>
										</div>

										<button
											type="button"
											onClick={() => removeItem(item.variantId)}
										>
											Remove
										</button>
									</li>
								))}
							</ul>

							<div>
								<p>
									Subtotal: {currencyCode} {subtotal}
								</p>

								{checkoutError && <p role="alert">{checkoutError}</p>}

								<button
									type="button"
									onClick={handleCheckout}
									disabled={isCheckingOut}
								>
									{isCheckingOut ? "Loading…" : "Checkout"}
								</button>
							</div>
						</>
					)}
				</div>
			</div>
		</>
	);
}
