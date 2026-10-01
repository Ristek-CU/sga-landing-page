const API = "https://bph-cms.sga-cakrawala.org/api/v1";
const CANONICAL = "https://sga-cakrawala.org";

export default {
	async fetch(request, env) {
		const url = new URL(request.url);
		const match = /^\/events\/([a-z0-9]+(?:-[a-z0-9]+)*)\/?$/.exec(
			url.pathname,
		);
		if (!match || !["GET", "HEAD"].includes(request.method))
			return env.ASSETS.fetch(request);
		const shell = await env.ASSETS.fetch(
			new Request(new URL("/index.html", url), { method: request.method }),
		);
		if (!shell.headers.get("Content-Type")?.includes("text/html")) return shell;
		let event;
		try {
			const response = await fetch(`${API}/events/${match[1]}`, {
				headers: { Accept: "application/json" },
				signal: AbortSignal.timeout(5000),
			});
			const body = await response.json();
			if (
				response.ok &&
				body.success &&
				["upcoming", "ongoing", "past"].includes(body.data?.status)
			)
				event = body.data;
		} catch {
			/* Keep the app available when metadata API is unavailable. */
		}
		const title = event
			? `${String(event.title).slice(0, 200)} | SGA Cakrawala`
			: "Event SGA Cakrawala";
		const description = event
			? String(
					event.description ||
						`${event.title} — lihat jadwal dan informasi acara SGA Cakrawala.`,
				).slice(0, 300)
			: "Lihat jadwal dan informasi acara SGA Cakrawala.";
		const canonical = `${CANONICAL}/events/${match[1]}`;
		let image;
		try {
			const candidate = new URL(event?.cover_image_url);
			if (
				candidate.protocol === "https:" &&
				!candidate.username &&
				!candidate.password
			)
				image = candidate.href;
		} catch {
			/* Retain the default social image. */
		}
		const content = (value) => ({
			element(element) {
				element.setAttribute("content", value);
			},
		});
		let rewriter = new HTMLRewriter()
			.on("title", {
				element(element) {
					element.setInnerContent(title);
				},
			})
			.on('meta[name="description"]', content(description))
			.on(
				'meta[property="og:title"], meta[name="twitter:title"], meta[property="twitter:title"]',
				content(title),
			)
			.on(
				'meta[property="og:description"], meta[name="twitter:description"], meta[property="twitter:description"]',
				content(description),
			)
			.on(
				'meta[property="og:url"], meta[name="twitter:url"], meta[property="twitter:url"]',
				content(canonical),
			)
			.on('link[rel="canonical"]', {
				element(element) {
					element.setAttribute("href", canonical);
				},
			});
		if (image)
			rewriter = rewriter.on(
				'meta[property="og:image"], meta[name="twitter:image"], meta[property="twitter:image"]',
				content(image),
			);
		const result = rewriter.transform(shell);
		const headers = new Headers(result.headers);
		headers.set("Cache-Control", "no-store, no-transform");
		headers.set("X-Content-Type-Options", "nosniff");
		headers.set("X-Frame-Options", "DENY");
		headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
		headers.set("Strict-Transport-Security", "max-age=31536000");
		headers.set(
			"Content-Security-Policy",
			"default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: blob: https:; connect-src 'self' https://bph-cms.sga-cakrawala.org https://cms.sga-cakrawala.org https://superapp.sga-cakrawala.org https://satgas.sga-cakrawala.org; frame-src https://www.google.com; frame-ancestors 'none'; base-uri 'self'; object-src 'none'; form-action 'self'",
		);
		if (!event) headers.set("X-Robots-Tag", "noindex");
		return new Response(result.body, { status: result.status, headers });
	},
};
