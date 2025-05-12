import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.dogcattictactoe.app',
  appName: 'Dog vs Cat Tic Tac Toe',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#3B82F6",
      showSpinner: true,
      androidSpinnerStyle: "large",
      spinnerColor: "#ffffff"
    }
  }
};

export default config;