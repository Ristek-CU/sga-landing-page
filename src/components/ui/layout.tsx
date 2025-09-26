import { Toaster } from "./toast";

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<head />
			<body>
				<main>{children}</main>
				<Toaster />
			</body>
		</html>
	);
}
