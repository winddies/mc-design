/*
 * @Author: Heng-Zhang2 Heng.Zhang2@budweiserapac.com
 * @Date: 2024-10-14 08:07:42
 * @LastEditors: Heng-Zhang2 Heng.Zhang2@budweiserapac.com
 * @LastEditTime: 2024-10-14 08:08:15
 * @FilePath: /mc-design/.eslintrc.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
module.exports = getESLintConfig("common-ts", {
  extends: ["plugin:prettier/recommended"],
  plugins: ["prettier"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "@iceworks/best-practices/recommend-functional-component": "off",
    "no-return-assign": "warn",
    "no-nested-ternary": "warn",
    "no-case-declarations": "warn",
    "no-fallthrough": "warn",
    "@typescript-eslint/no-unused-vars": "warn",
    "@typescript-eslint/restrict-plus-operands": "off",
    "@typescript-eslint/array-type": "off",
    "@typescript-eslint/no-useless-constructor": "off",
    // '@typescript-eslint/no-useless-constructor': 'off',
  },
});
