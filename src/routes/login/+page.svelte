<script></script>

<svelte:head>
    <title>RightWell: Lose Weight the Right Way</title>

	<meta property="og:image" content="https://rightwell.com/assets/og_image.jpg">
    <meta property="og:url" content="https://rightwell.com/">
    <meta property="og:type" content="website">

    <meta name="twitter:card" content="Lose fat, not muscle with a clinical approach that drives sustainable results.">
    <meta name="twitter:image" content="https://rightwell.com/assets/og_image.jpg">

	<script>
        window.initEmbeddables = () => {
        // Get the engine domain from the URL parameters
        const engineDomain =
            new URL(window.location.href).searchParams.get('embeddables_engine_domain') ||
            'engine.embeddables.com'
        const urlRoot = engineDomain.startsWith('http') ? engineDomain : 'https://' + engineDomain

        // Inject the bundle script dynamically
        const script = document.createElement('script')
        script.src = `${urlRoot}/bundle.js`
        document.head.appendChild(script)

        const initializeEmbeddables = function () {
            const allUserData = JSON.parse(localStorage.getItem('SavvyFormUserData') || '{}')
            const embeddablesToLoad = [...document.querySelectorAll('savvy, embeddable')].map((el) => {
            const attrs = Object.fromEntries([...el.attributes].map((a) => [a.name, a.value]))
            const flowId = attrs.id
            if (flowId && allUserData[flowId]) {
                attrs.userData = Object.fromEntries(Object.entries(allUserData[flowId]||{}).filter(([sk])=>sk==='current_page_id'||sk.startsWith('split_')))
            }
            return attrs
            })
            const originUrl = window.location.href
            const url =
            `${urlRoot}/init?load=` +
            encodeURIComponent(JSON.stringify({ embeddablesToLoad, originUrl }))

            fetch(url)
            .then((res) => res.json())
            .then((response) => eval('(' + response.init_js + ')(response.embeddables_data)'))
        }

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initializeEmbeddables)
        } else {
            initializeEmbeddables()
        }
        }
        window.initEmbeddables()
    </script>

    <script src="https://js.stripe.com/basil/stripe.js"></script>
</svelte:head>

<savvy id="flow_5e8j438g43g77564i11j7f02j3" redirect="billing"></savvy>