<!--
 * @Author: Heng-Zhang2 Heng.Zhang2@budweiserapac.com
 * @Date: 2023-09-27 16:43:09
 * @LastEditors: Heng-Zhang2 Heng.Zhang2@budweiserapac.com
 * @LastEditTime: 2024-10-22 11:42:38
 * @FilePath: /mc-design/README.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->

# mc-design

martech c 端组件库，基于 nut-ui-react-taro 的二次封装，提供便于品牌小程序复用的各种 ui 组件、状态结合以及 hooks。

## 启动

```
// 安装依赖
pnpm i
// 构建 package
pnpm build:all
// 启动 app
pnpm start:app
```

当修改 package 下的代码后，可以执行

```
// 重新构建修改的 package 并更新依赖该 package 的其他 package
pnpm affect
```
