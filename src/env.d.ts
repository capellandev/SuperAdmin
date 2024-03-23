interface ImportMetaEnv {
	BASE_URL: string;
	readonly SUPABASE_URL: string
	readonly SUPABASE_ANON_KEY: string
}
interface ImportMetaEnv {
	readonly SITE: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
