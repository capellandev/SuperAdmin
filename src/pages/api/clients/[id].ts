import type {APIContext, APIRoute} from 'astro';
import { supabase } from '../../../lib/supabase.ts';

export const GET: APIRoute = async ({ params }: APIContext) => {
	const id = Number(params.id);

	const { data: client, error } = await supabase
		.from('clients')
		.select('*')
		.eq('id', id)
		.single();

	if (error) {
		return new Response(JSON.stringify({ error: error.message }), {
			status: 500,
			headers: {
				'Content-Type': 'application/json',
			},
		});
	}

	return new Response(JSON.stringify(client), {
		status: 200,
		headers: {
			'Content-Type': 'application/json',
		},
	});
}

export const POST: APIRoute = async ({ params, request }: APIContext) => {
  const id = Number(params.id);
	const body = await request.json();

	const { data, error } = await supabase
		.from('clients')
		.update(body)
		.match({ id })
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
}

export const DELETE: APIRoute = async ({ params }: APIContext) => {
	const id = Number(params.id);

	const { data, error } = await supabase
		.from('clients')
		.delete()
		.match({ id })
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
}
