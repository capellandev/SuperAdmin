// src/pages/api/authenticate.ts
import type { APIRoute } from 'astro';
import { supabase } from '../lib/supabase';

export const get: APIRoute = async ({ cookies }) => {
	const accessToken = cookies.get('sb-access-token');
	const refreshToken = cookies.get('sb-refresh-token');

	if (!accessToken || !refreshToken) {
		return new Response(null, {
			status: 401,
			headers: {
				'Location': '/login',
			},
		});
	}

	const { data, error } = await supabase.auth.setSession({
		refresh_token: refreshToken,
		access_token: accessToken,
	});

	if (error) {
		cookies.delete('sb-access-token');
		cookies.delete('sb-refresh-token');
		return new Response(null, {
			status: 302,
			headers: {
				'Location': '/sign-in',
			},
		});
	}

	return new Response(JSON.stringify({ email: data?.user?.email }), {
		status: 200,
		headers: {
			'Content-Type': 'application/json',
		},
	});
};
