/*
 * @Author: Heng-Zhang2 Heng.Zhang2@budweiserapac.com
 * @Date: 2024-10-16 15:21:58
 * @LastEditors: Heng-Zhang2 Heng.Zhang2@budweiserapac.com
 * @LastEditTime: 2024-10-16 16:50:29
 * @FilePath: /mc-design/packages/mc-ui/src/components/configprovider/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { CSSProperties, FunctionComponent, createContext, useMemo } from 'react';
import classNames from 'classnames';
import { kebabCase } from 'lodash-es';
import type { MCCSSVariables } from './types';
import { View } from '@tarojs/components';

export interface ConfigProviderProps {
  theme: Record<string | MCCSSVariables, string>;
  style: CSSProperties;
  className: string;
  children: any;
}

const classPrefix = 'mc-configprovider';

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

ConfigProvider.displayName = 'NutConfigProvider';
