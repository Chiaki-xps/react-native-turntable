# React Native 转盘应用

一个基于 React Native 实现的转盘抽奖/决策应用，支持多端运行（iOS（待开发）、Android、Web）。

![image-download](./download.png)

## 功能特性

- 🎯 **转盘抽奖**: 点击 GO 按钮触发转盘旋转，随机选中一个选项
- 🎨 **流畅动画**: 使用 React Native Reanimated 实现流畅的旋转动画
- 📱 **多端兼容**: 支持 iOS、Android、Web 三端运行
- 💾 **数据持久化**: 使用 Redux Persist 保存转盘数据
- ✏️ **转盘管理**: 创建、编辑、删除转盘，支持多个转盘切换

## 转盘管理功能

### 创建转盘

- 自定义转盘名称
- 添加多个选项
- 实时预览效果

### 编辑转盘

- 修改转盘名称和选项
- 删除不需要的选项
- 添加新选项

### 删除转盘

- 支持删除指定转盘
- 自定义确认对话框，防止误删
- 删除当前选中转盘时自动切换到第一个转盘
- 美观的确认对话框 UI

### 转盘分享

- 生成转盘数据的二维码
- 美观的分享模态框界面
- 显示转盘名称和选项列表
- 二维码包含完整的转盘数据

### 转盘导入

- 扫描二维码导入转盘数据
- 自动处理重名转盘（添加序号）
- 权限处理和用户引导
- 扫描成功后的操作选择
- 美观的扫描界面和扫描框
- 支持重新扫描功能

## 技术栈

### 核心框架

- **React Native 0.79.5**: 跨平台移动应用开发
- **React 19.0.0**: 用户界面库
- **Expo SDK 53**: 开发工具链和构建服务
- **TypeScript 5.8.3**: 类型安全的 JavaScript

### 状态管理

- **Redux Toolkit 2.8.2**: 现代 Redux 状态管理
- **Redux Persist 6.0.0**: 数据持久化
- **React Redux 9.2.0**: React Redux 绑定

### 导航和路由

- **Expo Router 5.1.4**: 文件系统路由
- **React Navigation 7.x**: 导航库

### 动画和交互

- **React Native Reanimated 3.17.4**: 流畅动画
- **React Native Gesture Handler 2.24.0**: 手势处理
- **Expo Haptics 14.1.4**: 触觉反馈

### UI 组件

- **Expo Vector Icons 14.1.0**: 图标库
- **React Native SVG 15.12.0**: SVG 支持
- **React Native QRCode SVG 6.3.15**: 二维码生成

### 相机和扫描

- **Expo Camera 16.1.11**: 相机功能
- **Expo Barcode Scanner**: 二维码扫描

### 开发工具

- **ESLint 9.25.0**: 代码质量检查
- **Expo CLI**: 开发工具链
- **EAS CLI**: 构建和部署工具

## 快速开始

### 环境要求

- **Node.js 18+**: JavaScript 运行时
- **Expo CLI**: Expo 开发工具
- **Git**: 版本控制
- **iOS Simulator** (macOS) 或 **Android Emulator**: 移动设备模拟器

### 安装和设置

1. **克隆项目**

```bash
git clone <repository-url>
cd turntable
```

2. **安装依赖**

```bash
npm install
```

3. **安装 Expo CLI** (如果未安装)

```bash
npm install -g @expo/cli
```

### 开发模式

1. **启动开发服务器**

```bash
npx expo start
```

2. **选择运行平台**

- 按 `i` 启动 iOS 模拟器
- 按 `a` 启动 Android 模拟器
- 按 `w` 启动 Web 浏览器
- 扫描二维码在真机上运行

### 构建生产版本

1. **登录 Expo 账户**

```bash
npx eas login
```

2. **构建 Android APK**

```bash
npx eas build --platform android --profile preview
```

3. **构建 Android AAB** (Google Play)

```bash
npx eas build --platform android --profile production
```

4. **构建 iOS** (需要 Apple Developer 账户)

```bash
npx eas build --platform ios --profile production
```

## 项目结构

```
turntable/
├── app/                           # 页面组件 (Expo Router)
│   ├── (tabs)/                   # 标签页路由
│   │   ├── index.tsx             # 转盘主页面
│   │   ├── list.tsx              # 转盘列表页面
│   │   └── _layout.tsx           # 标签页布局
│   ├── create.tsx                # 创建转盘页面
│   ├── edit.tsx                  # 编辑转盘页面
│   ├── +not-found.tsx            # 404 页面
│   └── _layout.tsx               # 根布局
├── components/                   # 通用组件
│   ├── ui/                       # UI 基础组件
│   │   ├── IconSymbol.tsx        # 图标组件
│   │   ├── IconSymbol.ios.tsx    # iOS 图标组件
│   │   ├── TabBarBackground.tsx  # 标签栏背景
│   │   └── TabBarBackground.ios.tsx
│   ├── ScanModal.tsx             # 二维码扫描模态框
│   ├── ShareModal.tsx            # 分享模态框
│   ├── ThemedText.tsx            # 主题文本组件
│   ├── ThemedView.tsx            # 主题视图组件
│   ├── Collapsible.tsx           # 可折叠组件
│   ├── ExternalLink.tsx          # 外部链接组件
│   ├── HapticTab.tsx             # 触觉反馈标签
│   ├── HelloWave.tsx             # 欢迎动画组件
│   └── ParallaxScrollView.tsx    # 视差滚动组件
├── store/                        # Redux 状态管理
│   ├── index.ts                  # Store 配置
│   └── turntableSlice.ts         # 转盘状态切片
├── hooks/                        # 自定义 Hooks
│   ├── useColorScheme.ts         # 颜色主题 Hook
│   └── useColorScheme.web.ts     # Web 颜色主题 Hook
├── constants/                    # 常量定义
│   └── Colors.ts                 # 颜色常量
├── assets/                       # 静态资源
│   ├── fonts/                    # 字体文件
│   │   └── SpaceMono-Regular.ttf
│   └── images/                   # 图片资源
│       ├── app-logo.png          # 应用图标
│       ├── adaptive-icon.png     # 自适应图标
│       ├── favicon.png           # 网站图标
│       ├── icon.png              # 应用图标
│       ├── splash-icon.png       # 启动页图标
│       └── react-logo.png        # React 图标
├── scripts/                      # 脚本文件
│   └── reset-project.js          # 项目重置脚本
├── app.json                      # Expo 配置文件
├── eas.json                      # EAS 构建配置
├── package.json                  # 项目依赖配置
├── tsconfig.json                 # TypeScript 配置
├── eslint.config.js              # ESLint 配置
├── README.md                     # 项目说明文档
├── feature.md                    # 功能说明文档
└── doc.md                        # 开发文档
```

## 开发指南

### 代码规范

- 使用 **TypeScript** 进行类型安全的开发
- 遵循 **ESLint** 代码规范
- 使用 **Prettier** 进行代码格式化
- 组件使用 **函数式组件** 和 **Hooks**

### 项目结构说明

- **`app/`**: 使用 Expo Router 的文件系统路由
- **`components/`**: 可复用的 UI 组件
- **`store/`**: Redux 状态管理
- **`hooks/`**: 自定义 React Hooks
- **`constants/`**: 应用常量定义
- **`assets/`**: 静态资源文件

### 状态管理

项目使用 Redux Toolkit 进行状态管理：

```typescript
// 转盘状态结构
interface TurntableState {
  list: Turntable[]; // 转盘列表
  selectedId?: string; // 当前选中的转盘ID
}

// 转盘数据结构
interface Turntable {
  id: string; // 转盘ID
  name: string; // 转盘名称
  options: TurntableOption[]; // 转盘选项
}
```

### 构建和部署

#### 本地开发

```bash
npx expo start
```

#### 预览构建

```bash
npx eas build --platform android --profile preview
```

#### 生产构建

```bash
npx eas build --platform android --profile production
```

#### 提交到应用商店

```bash
npx eas submit --platform android
```

## 版本历史

### v1.0.1

- 新增二维码扫描导入功能
- 优化扫描界面和用户体验
- 完善权限处理和错误提示
- 修复 expo-barcode-scanner 弃用问题，使用 expo-camera 替代
- 更新 React Navigation 依赖，修复 pointerEvents 弃用警告
- 新增转盘分享功能，支持二维码分享
- 新增扫描二维码导入转盘功能
- 优化转盘列表界面和用户体验
- 修复多端兼容性问题
- 优化 UI 样式和动画效果
- 添加自定义应用图标

### v1.0.0

- 基础转盘功能
- 转盘创建和编辑
- 数据持久化

## 贡献指南

### 开发流程

1. **Fork 项目**
2. **创建功能分支**: `git checkout -b feature/your-feature`
3. **提交更改**: `git commit -m 'Add some feature'`
4. **推送分支**: `git push origin feature/your-feature`
5. **创建 Pull Request**

### 代码提交规范

- **feat**: 新功能
- **fix**: 修复 bug
- **docs**: 文档更新
- **style**: 代码格式调整
- **refactor**: 代码重构
- **test**: 测试相关
- **chore**: 构建过程或辅助工具的变动

### 问题反馈

如果您发现任何问题或有改进建议，请：

1. 查看 [Issues](../../issues) 是否已有相关讨论
2. 创建新的 Issue 并详细描述问题
3. 提供复现步骤和期望结果

## 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。
