import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
	appId: 'com.soundboarder.app',
	appName: 'simply-svelte-capasitor',
	webDir: 'build',
	server: {
		androidScheme: 'https',
	},
	linuxAndroidStudioPath: '/snap/bin/android-studio',
}

export default config
