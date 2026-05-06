import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import ProductForm from "@/components/ProductForm";
import { getProductByHandle } from "@/lib/shopify";
import { client } from "@/sanity/lib/client";
import { allProductSlugsQuery } from "@/sanity/lib/queries";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
	const slugs = await client.fetch(allProductSlugsQuery);
	return slugs.map((slug: string) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { slug } = await params;
	const product = await getProductByHandle(slug);
	if (!product) return {};
	return {
		title: product.title,
		description: product.descriptionHtml
			.replace(/<[^>]*>/g, "")
			.substring(0, 160),
	};
}

export default async function ProductPage({ params }: Props) {
	const { slug } = await params;
	const product = await getProductByHandle(slug);
	if (!product) notFound();

	const images = product.images.edges.map((e) => e.node);
	const variants = product.variants.edges.map((e) => e.node);

	return (
		<div className="px-4 py-12 sm:px-10">
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
				{/* Images */}
				<div className="flex flex-col gap-4">
					{images.length > 0 ? (
						images.map((img, i) => (
							<div
								key={img.url}
								className="relative aspect-square overflow-hidden"
							>
								<Image
									src={img.url}
									alt={img.altText ?? product.title}
									fill
									sizes="(max-width: 1024px) 100vw, 50vw"
									priority={i === 0}
									className="object-cover"
								/>
							</div>
						))
					) : (
						<div className="aspect-square bg-stone-100" />
					)}
				</div>

				{/* Product info */}
				<div className="flex flex-col gap-6 lg:sticky lg:top-8 lg:self-start">
					<h1 className="font-kiante text-4xl uppercase tracking-wide">
						{product.title}
					</h1>

					{product.descriptionHtml && (
						<div
							className="prose text-sm leading-relaxed"
							// biome-ignore lint/security/noDangerouslySetInnerHtml: Shopify-supplied HTML
							dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
						/>
					)}

					<ProductForm
						productHandle={product.handle}
						productTitle={product.title}
						options={product.options}
						variants={variants}
					/>
				</div>
			</div>
		</div>
	);
}
