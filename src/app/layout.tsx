import type { Metadata } from "next";

export const metadata: Metadata = {
	metadataBase: new URL("https://www.bloomsuniverse.com"),
	title: {
		default: "Admin | Blooms Universe",
		template: "%s | Blooms Universe",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className="antialiased">{children}</body>
		</html>
	);
}
