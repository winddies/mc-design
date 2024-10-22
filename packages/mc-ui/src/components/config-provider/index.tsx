import { FunctionComponent, createContext, useMemo } from 'react';
import classNames from 'classnames';
import { kebabCase } from 'lodash-es';
import type { MCCSSVariables } from './types';
import { BasicComponent } from '@nutui/nutui-react-taro/dist/types/utils/typings';
import { View } from '@tarojs/components';

export interface ConfigProviderProps extends BasicComponent {
  /** 主题变量 */
  theme?: Record<string | MCCSSVariables, string>;
}

const classPrefix = 'mc-config-provider';

const ConfigContext = createContext<Partial<ConfigProviderProps> | null>(null);

function convertThemeVarsToCSSVars(themeVars: Record<string, string | number>) {
  const cssVars: Record<string, string | number> = {};
  Object.keys(themeVars).forEach((key) => {
    cssVars[`--${kebabCase(key)}`] = themeVars[key];
  });
  return cssVars;
}

export const ConfigProvider: FunctionComponent<Partial<ConfigProviderProps>> = (props) => {
  const { style, className, children, ...config } = props;

  const cssVarStyle = useMemo(() => {
    return convertThemeVarsToCSSVars(config?.theme || {});
  }, [config?.theme]);

  return (
    <ConfigContext.Provider value={config}>
      <View
        className={classNames(classPrefix, className)}
        style={{
          ...cssVarStyle,
          ...style,
        }}
      >
        {children}
      </View>
    </ConfigContext.Provider>
  );
};

ConfigProvider.displayName = 'mc-config-provider';
