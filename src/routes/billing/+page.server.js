import { redirect } from '@sveltejs/kit';

export const prerender = false;

export async function load(event) {
	throw redirect(301, "https://billing.rightwell.com/p/login/dR67staXwfKO2Os000");
}