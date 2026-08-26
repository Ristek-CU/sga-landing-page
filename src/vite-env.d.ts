/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_ADVOCATION_API_URL?: string;
	readonly VITE_STUDENT_VOICE_CAMPAIGN?: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
