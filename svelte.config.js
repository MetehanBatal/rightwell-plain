import adapter from '@sveltejs/adapter-vercel';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		appDir: 'app',
		adapter: adapter({
			runtime: 'edge'
		}),
	},
	compilerOptions: {
		cssHash: ({ hash, css }) => `mtrix-${hash(css)}`,
	},
	isr: {
		expiration: 1200
	}
};

export default config;
