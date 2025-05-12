import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.dogcattictactoe.app',
  appName: 'Dog vs Cat Tic Tac Toe',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#3B82F6",
      showSpinner: true,
      androidSpinnerStyle: "large",
      spinnerColor: "#ffffff",
      splashImmersive: true
    },
    StatusBar: {
      backgroundColor: "#3B82F6",
      style: "light",
      overlaysWebView: true
    }
  },
  android: {
    allowMixedContent: true
  }
};

export default config;