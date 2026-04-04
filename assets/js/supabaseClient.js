import { IS_SUPABASE_CONFIGURED, SUPABASE_ANON_KEY, SUPABASE_URL } from "./config.js";

let clientPromise = null;

export async function getSupabaseClient() {
	if (!IS_SUPABASE_CONFIGURED) return null;

	if (!clientPromise) {
		clientPromise = import("https://esm.sh/@supabase/supabase-js@2").then(({ createClient }) =>
			createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
		);
	}

	return clientPromise;
}
