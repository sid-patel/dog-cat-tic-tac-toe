import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { SplashScreen } from '@capacitor/splash-screen';
import { StatusBar } from '@capacitor/status-bar';
import App from './App.tsx';
import './index.css';

// Initialize Capacitor plugins
const initializeApp = async () => {
  try {
    await StatusBar.setBackgroundColor({ color: '#3B82F6' });
    await SplashScreen.hide();
  } catch (error) {
    console.warn('Capacitor initialization error:', error);
  }
};

initializeApp();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);