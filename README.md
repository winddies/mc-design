# miracle
A dynamic and interactive low-code platform
## 启动
```
// 安装依赖
pnpm bootstrap
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
