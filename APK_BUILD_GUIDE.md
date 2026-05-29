# 软考题库 APK 打包指南

我已经为您准备好了所有打包 APK 所需的资源文件，存放在了目录：`f:\软考资料\202605\exam-app\mobile_dist`。

为了最快生成安卓 APK，推荐您使用以下工具之一：

## 推荐方案 1：使用 Website 2 APK Builder（最简单，推荐）

这是一个傻瓜式的 Windows 工具，可以将网页文件夹直接变成 APK。

1. **下载安装**：搜索并下载 "Website 2 APK Builder" (Pro 或免费版均可)。
2. **配置设置**：
   - **Website Type**: 选择 **Local Website Directory**（本地网页目录）。
   - **Directory of your Website**: 选择 `f:\软考资料\202605\exam-app\mobile_dist`。
   - **App Name**: 填入“软考智能题库”。
   - **Package Name**: 填入 `com.ruankao.examapp`。
   - **Icon**: 点击更换图标，虽然我已经为您生成了图标，您也可以自己选一张精美的图片。
   - **Output Directory**: 选择桌面或其他方便的地方。
3. **点击生成**：点击 "Generate APK"，稍等片刻，APK 文件就出现在桌面上啦！

## 推荐方案 2：直接作为 APP 安装（无需转换 APK）

由于我已经为您配置了 **PWA (Progressive Web App)** 技术，您甚至不需要专门生成 APK 也能获得原生 App 体验：

1. 将 `mobile_dist` 文件夹放到任何能访问的服务器（或用手机浏览器直接打开 index.html）。
2. 在手机 Chrome 浏览器打开页面。
3. 点击浏览器菜单 -> **“添加到主屏幕”**。
4. 手机桌面上会出现一个带图标的 App，点开后是全屏显示，且支持**离线做题**。

## 关于资源说明

- **图标**：已存放在 `mobile_dist/icons` 目录下。
- **离线支持**：已编写 `sw.js`，保证在没有网络的情况下也能加载题目。
- **配置**：已编写 `manifest.json`，确保安装后具有类似原生 App 的状态栏色调和启动显示。

祝您顺利生成 APK 并顺利通过软考！
