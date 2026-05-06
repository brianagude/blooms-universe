import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCollectionByHandle } from "@/lib/shopify";
import { client } from "@/sanity/lib/client";
import { allCollectionSlugsQuery } from "@/sanity/lib/queries";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
	const slugs = await client.fetch(allCollectionSlugsQuery);
	return slugs.map((slug: string) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { slug } = await params;
	const collection = await getCollectionByHandle(slug);
	if (!collection) return {};

	const title = collection.seo.title || collection.title;
	const description =
		collection.seo.description ||
		collection.descriptionHtml.replace(/<[^>]*>/g, "").substring(0, 160) ||
		null;
	const ogImage = collection.image?.url;

	return {
		title,
		...(description && { description }),
		openGraph: {
			title,
			...(description && { description }),
			...(ogImage && { images: [{ url: ogImage }] }),
		},
		twitter: {
			title,
			...(description && { description }),
			...(ogImage && { images: [ogImage] }),
		},
	};
}

export default async function CollectionPage({ params }: Props) {
	const { slug } = await params;
	const collection = await getCollectionByHandle(slug);
	if (!collection) notFound();

	const products = collection.products.edges.map((e) => e.node);

	return (
		<div className="px-4 py-12 sm:px-10">
			<div className="mb-10">
				<h1 className="font-kiante text-4xl uppercase tracking-wide mb-4">
					{collection.title}
				</h1>
				{collection.descriptionHtml && (
					<div
						className="prose max-w-2xl"
						// biome-ignore lint/security/noDangerouslySetInnerHtml: Shopify-supplied HTML
						dangerouslySetInnerHTML={{ __html: collection.descriptionHtml }}
					/>
				)}
			</div>

			{products.length === 0 ? (
				<p className="font-extrabold uppercase tracking-wide">
					No products in this collection yet.
				</p>
			) : (
				<ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
					{products.map((product) => {
						const price = product.priceRange.minVariantPrice;
						return (
							<li key={product.id}>
								<Link
									href={`/products/${product.handle}`}
									className="group flex flex-col gap-3"
								>
									{product.featuredImage ? (
										<div className="relative aspect-square overflow-hidden">
											<Image
												src={product.featuredImage.url}
												alt={product.featuredImage.altText ?? product.title}
												fill
												sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
												className="object-cover transition-transform duration-500 group-hover:scale-105"
											/>
											{!product.availableForSale && (
												<span className="absolute top-3 left-3 px-2 py-1 text-xs font-extrabold uppercase tracking-wider bg-black text-white">
													Sold out
												</span>
											)}
										</div>
									) : (
										<div className="aspect-square bg-stone-100" />
									)}
									<div className="flex justify-between items-baseline">
										<p className="font-extrabold uppercase tracking-wide text-sm">
											{product.title}
										</p>
										<p className="text-sm font-bold">
											{price.currencyCode}{" "}
											{Number.parseFloat(price.amount).toFixed(2)}
										</p>
									</div>
								</Link>
							</li>
						);
					})}
				</ul>
			)}
		</div>
	);
}
