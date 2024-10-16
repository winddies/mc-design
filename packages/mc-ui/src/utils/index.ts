const COMMON_PREFIX = 'mc';

/**
 * 生成组件的 className
 * @internal
 *
 * @param compName - 组件名
 * @returns
 */
export function getPrefixCls(compName: string) {
  return `${COMMON_PREFIX}-${compName}`;
}
