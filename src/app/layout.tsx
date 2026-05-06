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
		<html
				lang="en"
				className="antialiased min-h-full"
			>
			<body className="antialiased min-h-svh flex flex-col relative">
				{children}
			</body>
		</html>
	);
}
