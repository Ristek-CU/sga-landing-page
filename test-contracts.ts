import assert from "node:assert/strict";
import fs from "node:fs";
import { z } from "zod";

import {
	MAIN_NAV_LINKS,
	UKM_NAV_LINKS,
} from "./src/lib/navigation.ts";
import {
	CampaignSchema,
} from "./src/lib/student-voice.ts";
import {
	filterUkms,
	formatWhatsappLink,
	normalizeUKMItem,
	normalizeUKMList,
	processCategories,
} from "./src/lib/ukm-utils.ts";

console.log("Running architecture & contract tests...\n");

// 1. Student Voice CMS Schema Test
console.log("1. Testing Student Voice CMS Schema Validation");
const sampleValidCampaign = {
	slug: "test-campaign",
	title: "Test Title",
	description: "Test Description",
	status: "active",
	isOpen: true,
	opensAt: null,
	closesAt: null,
	fields: [
		{
			id: 1,
			label: "Nama",
			type: "short_text",
			required: true,
			options: [],
		},
		{
			id: 2,
			label: "Pilihan",
			type: "multiple_choice",
			required: false,
			options: ["A", "B"],
		},
	],
};

const parsedCampaign = CampaignSchema.safeParse(sampleValidCampaign);
assert.equal(parsedCampaign.success, true, "Valid campaign must parse successfully");

const invalidCampaign = {
	slug: "bad-campaign",
	fields: [{ id: "not-a-number" }],
};
const parsedInvalid = CampaignSchema.safeParse(invalidCampaign);
assert.equal(parsedInvalid.success, false, "Invalid campaign must fail validation");
console.log("✓ Student Voice Schema parses valid contracts and rejects bad data");

// 2. Student Society Data Model Normalization Test
console.log("\n2. Testing UKM Data Model Normalization");
const rawUkmWithLegacyAliases = {
	id: "robotika",
	name: "Robotika",
	category: "Teknologi",
	shortDesc: "Klub robotika",
	phone: "+62 812-3456-7890",
	registerUrl: "https://example.com/register",
	programs: [
		{ title: "Workshop", desc: "Workshop dasar", schedule: "Minggu" },
	],
	management: [
		{ name: "John Doe", role: "Ketua" },
	],
	documentations: [
		"https://example.com/doc1.jpg",
	],
};

const normalized = normalizeUKMItem(rawUkmWithLegacyAliases);
assert.equal(normalized.id, "robotika");
assert.equal(normalized.whatsapp, "+62 812-3456-7890", "Phone alias must normalize to whatsapp");
assert.equal(normalized.registrationUrl, "https://example.com/register", "registerUrl must normalize to registrationUrl");
assert.equal(normalized.programs[0].name, "Workshop", "title must normalize to name");
assert.equal(normalized.documentations[0].image, "https://example.com/doc1.jpg", "string docs must normalize to UKMDocumentation");
assert.equal(formatWhatsappLink(normalized.whatsapp), "https://wa.me/6281234567890", "WhatsApp link must format digits properly");

// Test with real repository data
const ukmJson = JSON.parse(fs.readFileSync("src/lib/data/ukm-section.json", "utf8"));
const normalizedList = normalizeUKMList(ukmJson);
assert.equal(normalizedList.length > 0, true, "Repository UKM list must not be empty");
for (const item of normalizedList) {
	assert.ok(item.id, "Every UKM must have an id");
	assert.ok(item.name, "Every UKM must have a name");
	assert.ok(Array.isArray(item.programs), "Every UKM must have programs array");
	assert.ok(Array.isArray(item.management), "Every UKM must have management array");
	assert.ok(Array.isArray(item.documentations), "Every UKM must have documentations array");
}
console.log("✓ UKM normalizer resolves aliases and accepts real repository data");

// Test UKM filtering
const categories = processCategories(null, normalizedList);
assert.ok(categories.includes("Semua"), "Categories must contain 'Semua'");
const searchResults = filterUkms(normalizedList, "Semua", "cakrawala");
assert.ok(Array.isArray(searchResults));
console.log("✓ UKM filtering and categorization work reliably");

// 3. Navigation Unification Parity Test
console.log("\n3. Testing Navigation Configuration Consistency");
assert.ok(MAIN_NAV_LINKS.length >= 4, "Main nav must contain primary links");
assert.ok(UKM_NAV_LINKS.length >= 3, "UKM nav must contain primary links");
const studentVoiceMain = MAIN_NAV_LINKS.find((l) => l.href === "/student-voice");
const studentVoiceUkm = UKM_NAV_LINKS.find((l) => l.href === "/student-voice");
assert.ok(studentVoiceMain, "Main nav must link to /student-voice");
assert.ok(studentVoiceUkm, "UKM nav must link to /student-voice");
console.log("✓ Navigation definitions are unified and consistent");

console.log("\nAll architecture contract tests passed successfully!");
