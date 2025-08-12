# React Native 转盘应用

一个基于 React Native 实现的转盘抽奖/决策应用，支持多端运行（iOS、Android、Web）。

## 功能特性

- 🎯 **转盘抽奖**: 点击 GO 按钮触发转盘旋转，随机选中一个选项
- 🎨 **流畅动画**: 使用 React Native Reanimated 实现流畅的旋转动画
- 📱 **多端兼容**: 支持 iOS、Android、Web 三端运行
- 💾 **数据持久化**: 使用 Redux Persist 保存转盘数据
- ✏️ **转盘管理**: 创建、编辑、删除转盘，支持多个转盘切换
- 🎨 **自定义图标**: 海盗主题设计的应用图标

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

## 技术栈

- **React Native**: 跨平台移动应用开发
- **Expo**: 开发工具链和构建服务
- **TypeScript**: 类型安全的 JavaScript
- **Redux Toolkit**: 状态管理
- **Redux Persist**: 数据持久化
- **React Native Reanimated**: 流畅动画
- **Expo Router**: 文件系统路由

## 快速开始

### 环境要求

- Node.js 18+
- Expo CLI
- iOS Simulator 或 Android Emulator

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npx expo start
```

### 构建生产版本

```bash
# Android
eas build -p android

# iOS
eas build -p ios
```

## 项目结构

```
turntable/
├── app/                    # 页面组件
│   ├── (tabs)/            # 标签页
│   │   ├── index.tsx      # 转盘主页面
│   │   ├── list.tsx       # 转盘列表
│   │   └── _layout.tsx    # 标签页布局
│   ├── create.tsx         # 创建转盘
│   ├── edit.tsx           # 编辑转盘
│   └── _layout.tsx        # 根布局
├── components/            # 通用组件
├── store/                 # Redux 状态管理
├── assets/                # 静态资源
└── app.json              # Expo 配置
```

## 版本历史

### v1.0.2 (最新)

- 新增转盘分享功能，支持二维码分享
- 优化转盘列表界面和用户体验

### v1.0.1

- 修复多端兼容性问题
- 优化 UI 样式和动画效果
- 添加自定义应用图标

### v1.0.0

- 基础转盘功能
- 转盘创建和编辑
- 数据持久化
