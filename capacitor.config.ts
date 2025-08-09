import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
	appId: 'com.soundboarder.app',
	appName: 'simply-svelte-capasitor',
	webDir: 'build',
	server: {
		androidScheme: 'https'
	}
};

export default config;
