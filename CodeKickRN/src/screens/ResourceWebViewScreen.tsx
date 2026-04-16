import React, { useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import { useTheme } from '../theme/ThemeContext';

export default function ResourceWebViewScreen({ route }: any) {
  const { url } = route.params;
  const { colors } = useTheme();
  const [isLoading, setIsLoading] = useState(true);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <WebView
        source={{ uri: url }}
        onLoadEnd={() => setIsLoading(false)}
        style={styles.webview}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        allowsInlineMediaPlayback={true}
      />
      {isLoading && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={colors.secondary} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
