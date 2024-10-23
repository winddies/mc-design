# mc-phone-number-button

手机号授权按钮

## Props

| 属性 | 说明 | 类型 | 是否必填 | 默认值 |
| ---- | ----------- | ---- | ---- | ---- |
| onClick | 点击事件, 如果 canCallPhoneNumber 为 true，则 code 为来自微信授权的动态令牌，如果为 false，则相当于普通 button 直接调用 onClick | (data?: string | MouseEvent<Element, MouseEvent>) => void  | Yes  | --
| canCallPhoneNumber | 能否调起微信授权获取手机号，如果为false，则相当于普通 button 直接调用 onClick | boolean  | No  | true
| isAgreePrivacyAuthorization | 是否同意隐私授权 | boolean  | No  | false
