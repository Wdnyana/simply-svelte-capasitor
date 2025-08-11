<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import '../app.css';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="grid grid-rows-[auto_1fr_auto] h-screen w-full">
	<header>
		<div class="flex flex-col items-center justify-center gap-2 py-5 px-3 md:px-6">
			<h1 class="mb-3 text-center">[ SVELTE + CAPACITOR SOUNDBOARD ]</h1>
			<p class="text-center">Welcome to the Svelte + Capacitor Soundboard app!</p>
			<p class="text-center">Click Anywhere to play the Soundboard</p>
		</div>
	</header>

	<main>
		{@render children?.()}
	</main>

	<footer>
		<div class="flex flex-col items-center justify-center gap-3 md:gap-5 py-3">
			<p>Footer...</p>
		</div>
	</footer>
</div>
