import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { 
  useFonts, 
  Vazirmatn_400Regular,
  Vazirmatn_500Medium,
  Vazirmatn_600SemiBold,
  Vazirmatn_700Bold,
} from '@expo-google-fonts/vazirmatn';
import * as SplashScreen from 'expo-splash-screen';
import { I18nManager, Platform } from 'react-native';

// Keep the splash screen visible until we're done loading fonts
SplashScreen.preventAutoHideAsync();

// Enable RTL mode
I18nManager.allowRTL(true);
I18nManager.forceRTL(true);

export default function RootLayout() {
  useFrameworkReady();

  const [fontsLoaded, fontError] = useFonts({
    Vazirmatn_400Regular,
    Vazirmatn_500Medium,
    Vazirmatn_600SemiBold,
    Vazirmatn_700Bold,
  });

  useEffect(() => {
    // Hide splash screen once fonts are loaded or if there's an error
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }

    // Force mobile viewport on web using a more React-friendly approach
    if (Platform.OS === 'web') {
      const meta = document.querySelector('meta[name="viewport"]') || document.createElement('meta');
      meta.name = 'viewport';
      meta.content = 'width=768, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover';
      
      if (!meta.parentNode) {
        document.head.appendChild(meta);
      }

      // Apply styles to body using a more stable approach
      const style = document.createElement('style');
      style.textContent = `
        body {
          max-width: 768px;
          margin: 0 auto;
          position: relative;
          height: 100vh;
          background-color: #f5f5f5;
        }
        #root {
          max-width: 768px;
          margin: 0 auto;
          height: 100vh;
          background-color: #ffffff;
          box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
        }
        @media (min-width: 769px) {
          body {
            padding: 20px;
          }
          #root {
            border-radius: 20px;
            overflow: hidden;
          }
        }
      `;
      
      if (!document.querySelector('style#mobile-viewport')) {
        style.id = 'mobile-viewport';
        document.head.appendChild(style);
      }
    }
  }, [fontsLoaded, fontError]);

  // Wait for fonts to load
  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="auth" options={{ presentation: 'modal' }} />
        <Stack.Screen name="profile" />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}