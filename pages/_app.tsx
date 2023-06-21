import type { AppProps } from 'next/app';
import { useMemo } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useMediaQuery, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { CacheProvider, EmotionCache } from '@emotion/react';

import { getThemeObj } from '../styles/theme';
import createEmotionCache from '../styles/createEmotionCache';

const queryClient = new QueryClient();
const clientSideEmotionCache = createEmotionCache();

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = useMemo(() => createTheme(getThemeObj(prefersDarkMode)), [prefersDarkMode]);

  return (
    <QueryClientProvider client={queryClient}>
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </CacheProvider>
    </QueryClientProvider>
  );
}
