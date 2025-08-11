<script lang="ts">
	import { onMount } from 'svelte'
	import { sounds } from '$lib/data/sounds'

	import { Haptics, ImpactStyle } from '@capacitor/haptics'
	import { Motion } from '@capacitor/motion'
	import type { Sound } from '$lib/types/general-type'
	import { error } from '@sveltejs/kit'

	// creating variable
	let currentSound: HTMLAudioElement | null = null
	let activeSound: number | null = null
	let shake: boolean = true
	let showAutoplayMessage: boolean = false

	// creating function play sound within fileSound Parameter
	async function playSound(fileSound: Sound): Promise<void> {
		if (currentSound && activeSound === fileSound.id) {
			currentSound.pause()
			currentSound = null
			activeSound = null

			return
		}

		// stop current sound if start other sound
		if (currentSound) {
			currentSound.pause()
			currentSound.currentTime = 0
		}

		try {
			await Haptics.impact({ style: ImpactStyle.Medium })
		} catch (error) {
			console.error('Error Haptics not available in browser:', error)
		}

		// playing new sound
		currentSound = new Audio(fileSound.file)
		try {
			currentSound.play()
			activeSound = fileSound.id

			// if playing sound succeeds, hide error message autoplay if exists
			showAutoplayMessage = false

			currentSound.addEventListener('ended', () => {
				activeSound = null
				currentSound = null
			})
		} catch (err: any) {
			if (err.name === 'AbortError') {
				console.error('Error playing sound:', err)
			} else if (error.name === 'NotAllowedError') {
				console.warn('Autoplay was blocked. User interaction needed:', err)
				showAutoplayMessage = true
			} else {
				console.error('Error playing sound: ', err)
			}

			// reseting state
			activeSound = null
			currentSound = null
		}
	}

	// function play random sound
	function playRandomSound(): void {
		if (sounds.length > 0) {
			const indexRandom: number = Math.floor(Math.random() * sounds.length)
			const soundRandom = sounds[indexRandom]

			playSound(soundRandom)
		}
	}

	// onmount lifecycle hook for registering movement sensor
	onMount(() => {
		try {
			Motion.addListener('accel', (event) => {
				const { x, y, z } = event.acceleration

				if (Math.abs(x) > 1.8 || Math.abs(y) > 1.8 || Math.abs(z) > 1.8) {
					if (shake) {
						shake = false
						playRandomSound()

						setTimeout(() => {
							shake = true
						}, 1000)
					}
				}
			})
		} catch (err) {
			console.error('Error registering motion listener:', err)
		}
	})
</script>

<div
	class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 px-3 lg:px-6 xl:px-12 content-center h-full container mx-auto"
>
	{#each sounds as sound (sound.id)}
		<button
			onclick={() => playSound(sound)}
			class="rounded-xl bg-card h-[150px] cursor-pointer hover:bg-card/70 transition duration-200 flex flex-col items-center justify-center gap-3 text-center"
		>
			{#if sound.id === activeSound}
				<span class="text-green-500">Playing...</span>
			{:else}
				<span class="text-red-500">Paused...</span>
			{/if}
			{sound.name}
		</button>
	{/each}
</div>
