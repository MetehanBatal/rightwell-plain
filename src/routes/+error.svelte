<script>
	import { browser } from '$app/environment';
	import { page } from '$app/stores';

	// Refer to +error.svelte
	// decide whether redirect or a static page here
	//
	if (browser) {
		// Get current URL parameters
		const currentParams = new URLSearchParams(window.location.search);
		
		// Add or update utm_source parameter
		currentParams.set('utm_source', '404');
		
		// Get the originally requested page path
		const redirectedFrom = $page.url.pathname;
		currentParams.set('redirectedFrom', redirectedFrom);
		
		// Redirect with preserved parameters
		window.location.replace(`/?${currentParams.toString()}`)
	}
</script>