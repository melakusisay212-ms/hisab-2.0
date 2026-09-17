import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.melaku.hisab',
  appName: 'Hisab',
  webDir: '.output/public',
  bundledWebRuntime: false,
  android: {
    allowMixedContent: false,
    backgroundColor: '#090c18',
  },
  server: {
    androidScheme: 'https',
  },
};

export default config;
