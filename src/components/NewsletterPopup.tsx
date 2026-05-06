"use client";

import Image from "next/image";
import { PortableText } from "next-sanity";
import type { ReactNode } from "react";
import { urlFor } from "@/sanity/lib/image";
import type { NewsletterBlock, PortableTextImage, SanityImageWithLqip } from "@/sanity/types";
import SignUpForm from "./inputs/SignUpForm";

type Props = {
	image?: (SanityImageWithLqip & { alt?: string }) | null;
	content?: NewsletterBlock[] | null;
	onClose: () => void;
};

const portableTextComponents = {
	block: {
		normal: ({ children }: { children: ReactNode }) => (
			<p className="font-colby text-sm leading-relaxed md:text-base">
				{children}
			</p>
		),
		h2: ({ children }: { children: ReactNode }) => (
			<h2 className="font-kiante uppercase text-3xl leading-tight md:text-4xl">
				{children}
			</h2>
		),
		h3: ({ children }: { children: ReactNode }) => (
			<h3 className="font-kiante uppercase text-2xl leading-tight md:text-3xl">
				{children}
			</h3>
		),
		h4: ({ children }: { children: ReactNode }) => (
			<h4 className="font-kiante uppercase text-xl leading-tight">
				{children}
			</h4>
		),
	},
	marks: {
		link: ({
			value,
			children,
		}: {
			value?: { href?: string };
			children: ReactNode;
		}) => (
			<a
				href={value?.href}
				target="_blank"
				rel="noopener noreferrer"
				className="underline underline-offset-2"
			>
				{children}
			</a>
		),
	},
	types: {
		image: ({ value }: { value: PortableTextImage }) => {
			if (!value?.asset?.url) return null;
			const { url, metadata } = value.asset;
			const naturalWidth = metadata?.dimensions?.width ?? 320;
			const naturalHeight = metadata?.dimensions?.height ?? 200;
			const maxWidth = value.width ?? naturalWidth;
			return (
				<Image
					src={url}
					alt={value.alt ?? ""}
					width={naturalWidth}
					height={naturalHeight}
					style={{ maxWidth: `${maxWidth}px`, width: "100%", height: "auto" }}
				/>
			);
		},
	},
};

export default function NewsletterPopup({ image, content, onClose }: Props) {
	return (
		<div className="z-10 flex flex-col items-center justify-center gap-8 w-full max-w-2xl">
			{image?.asset && (
				<Image
					src={urlFor(image).width(188).height(254).auto("format").url()}
					alt={image.alt ?? ""}
					width={188}
					height={254}
					placeholder={image.asset.metadata?.lqip ? "blur" : "empty"}
					blurDataURL={image.asset.metadata?.lqip ?? undefined}
					className="rounded-3xl border border-black"
				/>
			)}
			<div className="bg-white p-4 w-full rounded-4xl flex flex-col items-center justify-center gap-6 border border-green relative">
				{content && content.length > 0 && (
					<div className="text-center space-y-2 w-full max-w-md mx-auto">
						<PortableText
							value={content as any}
							components={portableTextComponents as any}
						/>
					</div>
				)}
				<SignUpForm />
				<button
					type="button"
					onClick={onClose}
					aria-label="Close newsletter"
					className="absolute top-4 right-4 text-sm font-extrabold uppercase tracking-wider leading-none"
				>
					CLOSE
				</button>
			</div>
		</div>
	);
}
