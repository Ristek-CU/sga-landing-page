/** A readable countdown based on an absolute timestamp, independent of browser timezone. */
export function formatEventCountdown(
	startsAt: string,
	now = Date.now(),
): string {
	const difference = Date.parse(startsAt) - now;
	if (!Number.isFinite(difference)) return "Jadwal akan diumumkan";
	if (difference <= 0) return "Waktu mulai telah tiba";
	if (difference < 60_000) return "Dimulai kurang dari 1 menit lagi";
	const totalMinutes = Math.floor(difference / 60_000);
	const days = Math.floor(totalMinutes / 1440);
	const hours = Math.floor((totalMinutes % 1440) / 60);
	const minutes = totalMinutes % 60;
	const parts = [
		days ? `${days} hari` : "",
		hours ? `${hours} jam` : "",
		minutes ? `${minutes} menit` : "",
	].filter(Boolean);
	return `Dimulai ${parts.join(" ")} lagi`;
}
