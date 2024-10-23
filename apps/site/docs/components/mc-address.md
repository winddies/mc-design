---
hide_title: true
---

## 地理位置展示

展示当前的地理位置，需要结合 useAddress 一起使用

### 引入

```typescript
import { Address } from '@bud-fe/mc-ui';
```

### 示例代码

```typescript
import { Address } from "@bud-fe/mc-ui";
import { useAddress } from "@bud-fe/mc-ui/hooks";

function HomePage() {
  // 把当前小程序的 request 实例作为配置项传给 hooks，这里只需要在第一次使用时传递，后续再使用 useAddress 可以直接获取数据
  useAddress(request);
  return <Address />;
}

function OtherPage() {
  // 如果已经加载过 Address 组件，那么后续只要通过 useAddress 去管理数据状态即可。
  const { address, clearAddress, location, setLocation, fetchAddressInfo } =
    useAddress();
}
```

### 注意：

<div class="theme-admonition theme-admonition-tip  alert alert--success">
  `useAddress` 并不是一个一次性使用的 hook，这个跟我们常用的 react 的 hook 概念并不相同，它本身返回的是一个 zustand 数据管理集合，所以具备持久化的特性。
  虽然这样比较方便的解决了数据获取的问题，但是在使用中要注意需要配合 Address 组件使用，以及小程序冷启动时导致的数据失效问题。最好避免此类问题的方式是：
  不需要关心是否在一个组件，但`useAddress` 跟使用 `<Address />` 组件的地方最好在同一个页面内。
</div>

## Props

| 属性                 | 说明                               | 类型       | 是否必填 | 默认值 |
| -------------------- | ---------------------------------- | ---------- | -------- | ------ |
| defaultTip           | 未获得地理位置时的默认提示语       | string     | No       | N/A    |
| prerequisite         | 先决条件                           | "privacy"  | No       | N/A    |
| preventAutoAuthorize | 是否要阻止向用户索要地理位置权限   | boolean    | No       | N/A    |
| onLocationAuthDenied | 获取地理位置授权信息为被拒绝时触发 | () => void | No       | N/A    |
| onLocationAuthFailed | 获取地理位置授权信息失败时触发     | () => void | No       | N/A    |
