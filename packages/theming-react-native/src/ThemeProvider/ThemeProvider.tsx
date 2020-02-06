import * as React from 'react';
import { View } from 'react-native';
import { getBoxStyle } from './useBoxStyle';
import { IThemeProviderProps } from './ThemeProvider.types';
import { useThemeRegistry, ThemeRegistryContext, ThemeContext } from '../ThemeContext';
import { IThemeEventListener } from '@uifabricshared/theme-registry';
import { getThemeRegistry } from '../Global';

export const ThemeProvider: React.FunctionComponent<IThemeProviderProps> = (props: IThemeProviderProps) => {
  const { registry: registryFromProps, theme: themeName = '', children } = props;
  const registryToUse = registryFromProps || useThemeRegistry() || getThemeRegistry();
  const [theme, setThemeState] = React.useState(registryToUse.getTheme(themeName));

  React.useEffect(() => {
    const themeInvalidater: IThemeEventListener = {
      onInvalidate: (name: string) => {
        name === themeName && setThemeState(registryToUse.getTheme(themeName));
      }
    };

    registryToUse.addEventListener(themeInvalidater);
    return () => {
      registryToUse.removeEventListener(themeInvalidater);
    };
  }, [registryToUse, themeName, setThemeState]);

  const boxStyle = getBoxStyle(theme);

  const themeProvider = (
    <ThemeContext.Provider value={theme}>
      <View style={boxStyle}>{children}</View>
    </ThemeContext.Provider>
  );

  // note `registryFromProps` came from props and it's not the same as `registryToUse`
  return registryFromProps ? (
    <ThemeRegistryContext.Provider value={registryFromProps}>{themeProvider}</ThemeRegistryContext.Provider>
  ) : (
    themeProvider
  );
};