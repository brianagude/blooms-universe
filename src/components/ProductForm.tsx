"use client";

import { useState } from "react";
import type { ShopifyOption, ShopifyVariant } from "@/lib/shopify-types";
import { useCart } from "@/store/cart";

type Props = {
	productHandle: string;
	productTitle: string;
	options: ShopifyOption[];
	variants: ShopifyVariant[];
};

export default function ProductForm({
	productHandle,
	productTitle,
	options,
	variants,
}: Props) {
	const isDefaultVariant =
		variants.length === 1 && variants[0].title === "Default Title";

	const firstAvailableVariant =
		variants.find((v) => v.availableForSale) ?? variants[0];

	const [selectedOptions, setSelectedOptions] = useState<
		Record<string, string>
	>(() => {
		const initial: Record<string, string> = {};
		for (const opt of firstAvailableVariant?.selectedOptions ?? []) {
			initial[opt.name] = opt.value;
		}
		return initial;
	});

	const [quantity, setQuantity] = useState(1);
	const [adding, setAdding] = useState(false);

	const { addItem, openCart } = useCart();

	const activeVariant = variants.find((v) =>
		v.selectedOptions.every((opt) => selectedOptions[opt.name] === opt.value),
	);

	const isValueAvailable = (optionName: string, value: string) => {
		const testOptions = { ...selectedOptions, [optionName]: value };
		return variants.some(
			(v) =>
				v.availableForSale &&
				v.selectedOptions.every((opt) => testOptions[opt.name] === opt.value),
		);
	};

	const handleAddToCart = () => {
		if (!activeVariant?.availableForSale) return;
		setAdding(true);
		addItem({
			variantId: activeVariant.id,
			productHandle,
			title: productTitle,
			variantTitle: activeVariant.title,
			price: activeVariant.price.amount,
			currencyCode: activeVariant.price.currencyCode,
			image: activeVariant.image?.url ?? null,
			quantity,
		});
		openCart();
		setAdding(false);
	};

	const price = activeVariant?.price ?? variants[0]?.price;
	const compareAtPrice = activeVariant?.compareAtPrice;
	const isOnSale =
		compareAtPrice &&
		Number.parseFloat(compareAtPrice.amount) >
			Number.parseFloat(price?.amount ?? "0");
	const available = activeVariant?.availableForSale ?? false;

	return (
		<div className="flex flex-col gap-6">
			{!isDefaultVariant && (
				<div className="flex flex-col gap-4">
					{options.map((option) => (
						<div key={option.id} className="flex flex-col gap-2">
							<p className="text-sm font-extrabold uppercase tracking-wider">
								{option.name}
							</p>
							<div className="flex flex-wrap gap-2">
								{option.values.map((value) => {
									const optAvailable = isValueAvailable(option.name, value);
									const selected = selectedOptions[option.name] === value;
									return (
										<button
											key={value}
											type="button"
											disabled={!optAvailable}
											aria-pressed={selected}
											onClick={() =>
												setSelectedOptions((prev) => ({
													...prev,
													[option.name]: value,
												}))
											}
											className={[
												"px-4 py-2 text-sm font-bold uppercase tracking-wide border transition-colors",
												selected
													? "border-current bg-current text-white"
													: "border-current",
												!optAvailable &&
													"opacity-30 cursor-not-allowed line-through",
											]
												.filter(Boolean)
												.join(" ")}
										>
											{value}
										</button>
									);
								})}
							</div>
						</div>
					))}
				</div>
			)}

			<div className="flex items-baseline gap-3">
				{isOnSale && compareAtPrice && (
					<s className="text-base opacity-50">
						{compareAtPrice.currencyCode}{" "}
						{Number.parseFloat(compareAtPrice.amount).toFixed(2)}
					</s>
				)}
				{price && (
					<p className="text-xl font-extrabold uppercase tracking-wide">
						{price.currencyCode} {Number.parseFloat(price.amount).toFixed(2)}
					</p>
				)}
			</div>

			<div className="flex items-center gap-0 border border-current w-fit">
				<button
					type="button"
					aria-label="Decrease quantity"
					onClick={() => setQuantity((q) => Math.max(1, q - 1))}
					className="px-4 py-2 text-base font-bold"
				>
					−
				</button>
				<span className="px-4 py-2 text-base font-bold min-w-[3rem] text-center">
					{quantity}
				</span>
				<button
					type="button"
					aria-label="Increase quantity"
					onClick={() => setQuantity((q) => q + 1)}
					className="px-4 py-2 text-base font-bold"
				>
					+
				</button>
			</div>

			<button
				type="button"
				disabled={!available || adding}
				onClick={handleAddToCart}
				className={[
					"px-8 py-3 text-base font-extrabold uppercase tracking-wider border border-current transition-opacity",
					(!available || adding) && "opacity-40 cursor-not-allowed",
				]
					.filter(Boolean)
					.join(" ")}
			>
				{!available ? "Sold out" : adding ? "Adding…" : "Add to cart"}
			</button>
		</div>
	);
}
