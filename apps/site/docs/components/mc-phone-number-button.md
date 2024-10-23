---
hide_title: true
---

## 手机号授权按钮

---

### 引入

```typescript
import { PhoneNumberButton } from "@bud-fe/mc-ui";
```

### 示例代码

```typescript
import { PhoneNumberButton } from "@bud-fe/mc-ui";

function () {
  const handleButtonClick = (code: string | MouseEvent) => {
    // code 为来自微信授权的动态令牌，但是如果获取过，这里的 code 就为点击事件对象
  }

  return (
    <PhoneNumberButton {...buttonProps} isAgreePrivacyAuthorization onClick={handleButtonClick}>
      {text}
    </PhoneNumberButton>
  )
}
```

### Props

| 属性                        | 说明                                                                                                                            | 类型                 | 是否必填 | 默认值 |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------- | -------------------- | -------- | ------ |
| onClick                     | 点击事件, 如果 canCallPhoneNumber 为 true，则 code 为来自微信授权的动态令牌，如果为 false，则相当于普通 button 直接调用 onClick | (data?: any) => void | Yes      | N/A    |
| canCallPhoneNumber          | 能否调起微信授权获取手机号，如果为 false，则相当于普通 button 直接调用 onClick                                                  | boolean              | No       | true   |
| isAgreePrivacyAuthorization | 是否同意隐私授权                                                                                                                | boolean              | No       | false  |
