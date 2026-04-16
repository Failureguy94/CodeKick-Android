import { Linking } from 'react-native';

export const openResourceLink = (url: string, navigation: any) => {
  if (!url) return;
  
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    navigation.navigate('ResourceWebView', { url });
  } else {
    // Other links can be opened in external browser or also in ResourceWebView
    // Based on user request, only YT videos strictly need to run in app.
    // However, for consistency, we could open all links in WebView, 
    // but we'll stick to YouTube and default to Linking for others, or just use WebView for all.
    // Let's redirect YouTube videos specifically:
    navigation.navigate('ResourceWebView', { url });
  }
};
