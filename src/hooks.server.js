import { redirect } from '@sveltejs/kit';

export async function handle({ event, resolve }) {
	if (event.url.pathname.includes('/undefined')) {
		throw redirect(303, '/')
	}

	const response = await resolve(event);

	return response;
}