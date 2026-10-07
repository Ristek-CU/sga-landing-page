export interface NavLinkItem {
	label: string;
	href: string;
	to: string;
	isRoute?: boolean;
}

export const MAIN_NAV_LINKS: NavLinkItem[] = [
	{ label: "About Us", href: "/#about-us", to: "/#about-us" },
	{ label: "Vision & Mission", href: "/#vision", to: "/#vision" },
	{ label: "Members", href: "/#division", to: "/#division" },
	{ label: "Event", href: "/#event", to: "/#event" },
	{
		label: "Student Voice",
		href: "/student-voice",
		to: "/student-voice",
		isRoute: true,
	},
];

export const UKM_NAV_LINKS: NavLinkItem[] = [
	{ label: "Beranda", href: "/", to: "/", isRoute: true },
	{
		label: "Eksplorasi UKM",
		href: "/student-societes#eksplorasi",
		to: "/student-societes#eksplorasi",
	},
	{
		label: "Cara Bergabung",
		href: "/student-societes#panduan",
		to: "/student-societes#panduan",
	},
	{
		label: "Student Voice",
		href: "/student-voice",
		to: "/student-voice",
		isRoute: true,
	},
];
