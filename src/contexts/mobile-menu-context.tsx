import React from "react";

interface MobileMenuContext {
	isMobileMenuOpen: boolean;
	setIsMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
	toggleMobileMenu: () => void;
}

const MobileMenuContext = React.createContext<MobileMenuContext | null>(null);

export function useMobileMenuContext() {
	const context = React.use(MobileMenuContext);
	if (!context)
		throw new Error(
			"useMobileMenuContext must be used within a MobileMenuContextProvider",
		);

	return context;
}

export function MobileMenuContextProvider({
	children,
}: React.PropsWithChildren) {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
	const toggleMobileMenu = React.useCallback(() => {
		setIsMobileMenuOpen((prev) => !prev);
	}, []);

	const contextValue = React.useMemo<MobileMenuContext>(
		() => ({
			isMobileMenuOpen,
			setIsMobileMenuOpen,
			toggleMobileMenu,
		}),
		[isMobileMenuOpen, setIsMobileMenuOpen, toggleMobileMenu],
	);

	return (
		<MobileMenuContext.Provider value={contextValue}>
			{children}
		</MobileMenuContext.Provider>
	);
}

export default MobileMenuContext;
