/*
 * @Author: Heng-Zhang2 Heng.Zhang2@budweiserapac.com
 * @Date: 2024-10-16 15:21:58
 * @LastEditors: Heng-Zhang2 Heng.Zhang2@budweiserapac.com
 * @LastEditTime: 2024-10-16 16:50:29
 * @FilePath: /mc-design/packages/mc-ui/src/components/configprovider/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { FunctionComponent, createContext, useContext } from "react";
import classNames from "classnames";
import { kebabCase } from "lodash-es";
import type { MCCSSVariables } from "./types";

export interface ConfigProviderProps {
  theme?: Record<string | MCCSSVariables, string>;
}

const classPrefix = "mc-configprovider";

const ConfigContext = createContext<ConfigProviderProps | null>(null);

function convertThemeVarsToCSSVars(themeVars: Record<string, string | number>) {
  const cssVars: Record<string, string | number> = {};
  Object.keys(themeVars).forEach((key) => {
    cssVars[`--${kebabCase(key)}`] = themeVars[key];
  });
  return cssVars;
}

export const ConfigProvider: FunctionComponent<Partial<ConfigProviderProps>> = (
  props
) => {
  const { style, className, children, ...config } = props;

  const cssVarStyle = React.useMemo(() => {
    return convertThemeVarsToCSSVars(config?.theme || {});
  }, [config?.theme]);

  return (
    <ConfigContext.Provider value={config}>
      <div
        className={classNames(classPrefix, className)}
        style={{
          ...cssVarStyle,
          ...style,
        }}
      >
        {children}
      </div>
    </ConfigContext.Provider>
  );
};

ConfigProvider.displayName = "NutConfigProvider";
