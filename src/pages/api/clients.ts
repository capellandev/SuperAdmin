import type { APIRoute } from "astro";
import { supabase } from "../../lib/supabase";

export const GET: APIRoute = async () => {
	const { data: clients, error } = await supabase
		.from('clients')
		.select('*');

	if (error) {
		return new Response(JSON.stringify({ error: error.message }), {
			status: 500,
			headers: {
				'Content-Type': 'application/json',
			},
		});
	}

	return new Response(JSON.stringify({ clients }), {
		status: 200,
		headers: {
			'Content-Type': 'application/json',
		},
	});
};

export const POST: APIRoute = async ({ request }) => {
	// Asumiendo que el cuerpo de la solicitud se envía como JSON
	const body = await request.json(); // Analizar el cuerpo de la solicitud como JSON
	const { name, tel, email, status } = body;

	const { data, error } = await supabase
		.from('clients')
		.insert([{ name, tel, email, status }])
		.select('*');

	if (error) {
		return new Response(JSON.stringify({ error: error.message }), {
			status: 400,
			headers: {
				'Content-Type': 'application/json',
			},
		});
	}

	return new Response(JSON.stringify(data), {
		status: 200,
		headers: {
			'Content-Type': 'application/json',
		},
	});
};
