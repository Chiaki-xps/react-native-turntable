# 转盘应用开发日志

## 项目概述

**项目名称**: React Native 转盘应用  
**技术栈**: React Native + Expo + TypeScript + Redux Toolkit + Redux Persist  
**项目描述**: 一个基于 React Native 实现的转盘抽奖/决策应用，支持多端运行（iOS、Android、Web）

## 核心功能

### 1. 转盘功能

- **随机抽奖**: 点击 GO 按钮触发转盘旋转，随机选中一个选项
- **动画效果**: 使用 React Native Reanimated 实现流畅的旋转动画
- **结果展示**: 动画结束后显示抽中的结果
- **多选项支持**: 支持任意数量的选项，自动计算扇区角度

### 2. 转盘管理

- **创建转盘**: 自定义转盘名称和选项
- **编辑转盘**: 修改现有转盘的内容
- **转盘列表**: 管理多个转盘，支持切换
- **数据持久化**: 使用 Redux Persist 保存转盘数据

### 3. 多端兼容

- **跨平台**: iOS、Android、Web 三端支持
- **自适应存储**: Web 端使用 localStorage，原生端使用 AsyncStorage
- **响应式设计**: 适配不同屏幕尺寸

## 技术实现

### 转盘旋转核心逻辑

```typescript
// 动画相关
const rotate = useSharedValue(0); // 记录当前转盘的旋转角度（动画值）
const [resultIdx, setResultIdx] = useState<number | null>(null); // 记录抽中的选项索引

// 绑定动画样式，使转盘随 rotate 变化旋转
const animatedStyle = useAnimatedStyle(() => ({
  transform: [{ rotate: `${rotate.value}deg` }],
}));

// 点击 GO 按钮时触发转盘旋转
const handleGo = () => {
  if (options.length === 0) return;
  // 随机抽取一个选项索引
  const idx = Math.floor(Math.random() * options.length);
  setResultIdx(null); // 动画开始时隐藏结果
  // 计算目标角度：多转5圈再停到目标选项（idx），0.5是让指针指向扇区中间
  const targetAngle = 360 * 5 + (360 - (idx + 0.5) * angleStep);
  // 启动动画，3秒内转到目标角度
  rotate.value = withTiming(targetAngle, { duration: 3000 }, () => {
    // 动画结束后，角度归一化到0-360
    rotate.value = targetAngle % 360;
    // 显示抽中的结果
    runOnJS(setResultIdx)(idx);
  });
};
```

### 数据持久化方案

```typescript
// 多端兼容的存储方案
function getStorage() {
  if (Platform.OS === "web") {
    try {
      const testKey = "__storage_test__";
      window.localStorage.setItem(testKey, "1");
      window.localStorage.removeItem(testKey);
      return require("redux-persist/lib/storage").default;
    } catch (e) {
      // localStorage 不可用，降级为 noop storage
      return {
        getItem: () => Promise.resolve(null),
        setItem: () => Promise.resolve(),
        removeItem: () => Promise.resolve(),
      };
    }
  } else {
    return require("@react-native-async-storage/async-storage").default;
  }
}
```

## 开发历程

### 版本 1.0.0

- 基础转盘功能实现
- 转盘创建和编辑功能
- 基础 UI 设计

### 版本 1.0.1

- **修复 Web 端兼容性问题**

  - 解决 `window is not defined` 报错
  - 实现多端存储兼容（Web 使用 localStorage，原生使用 AsyncStorage）
  - 添加自动降级 noop storage 机制

- **修复 UI 兼容性问题**

  - 解决部分安卓机型（如小米）输入框文字上移问题
  - 统一 `textAlignVertical: "center"` 样式

- **优化样式系统**

  - 处理 shadow\* 属性在 Web 端弃用问题
  - 实现多端阴影样式兼容（Web 用 boxShadow，原生保留 shadow\*）
  - 优化 redux-persist 警告处理

- **应用图标优化**

  - 添加自定义应用图标（海盗主题设计）
  - 配置 Android 自适应图标
  - 实现多端图标一致性

- **用户体验优化**

  - 添加默认转盘数据"今天吃什么"
  - 首次打开应用默认选中初始转盘
  - 优化转盘旋转动画和结果展示

### 版本 1.0.2

- **新增转盘管理功能**

  - 添加删除转盘功能，支持删除指定转盘
  - 实现自定义确认对话框，替代不兼容的 Alert.alert
  - 删除当前选中转盘时自动切换到第一个转盘
  - 优化转盘列表 UI，添加删除按钮图标
  - 解决 Alert.alert 在某些环境下不工作的问题

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
│   ├── index.ts           # Store 配置
│   └── turntableSlice.ts  # 转盘状态切片
├── assets/                # 静态资源
│   └── images/            # 图片资源
│       └── app-logo.png   # 应用图标
└── app.json              # Expo 配置
```

## 关键技术点

### 1. React Native Reanimated

- 使用 `useSharedValue` 管理动画状态
- 使用 `useAnimatedStyle` 绑定动画样式
- 使用 `withTiming` 实现缓动动画
- 使用 `runOnJS` 在动画回调中执行 JS 代码

### 2. Redux Toolkit + Redux Persist

- 使用 RTK 简化 Redux 配置
- 使用 Redux Persist 实现数据持久化
- 多端存储兼容性处理

### 3. Expo Router

- 基于文件系统的路由
- 类型安全的路由参数
- 嵌套路由支持

### 4. SVG 绘图

- 使用 react-native-svg 绘制转盘
- 动态计算扇区路径
- 文字位置自动布局

## 已知问题和解决方案

### 1. Web 端兼容性

**问题**: `window is not defined` 报错  
**解决**: 实现多端存储兼容，Web 端使用 localStorage，原生端使用 AsyncStorage

### 2. 输入框样式兼容性

**问题**: 部分安卓机型输入框文字上移  
**解决**: 统一设置 `textAlignVertical: "center"`

### 3. 阴影样式兼容性

**问题**: shadow* 属性在 Web 端弃用  
**解决**: 实现条件样式，Web 端用 boxShadow，原生端保留 shadow*

### 4. 应用图标更新

**问题**: 打包后图标未更新  
**解决**: 确保图标路径正确，清理缓存后重新打包

## 部署和打包

### 开发环境

```bash
npx expo start          # 启动开发服务器
npx expo start -c       # 清理缓存启动
```

### 生产打包

```bash
eas build -p android    # 打包 Android
eas build -p ios        # 打包 iOS
eas submit --platform android  # 提交到 Google Play
```

## 未来规划

1. **功能扩展**

   - 添加转盘模板功能
   - 支持转盘分享
   - 添加历史记录功能

2. **性能优化**

   - 优化动画性能
   - 减少包体积
   - 提升启动速度

3. **用户体验**
   - 添加音效
   - 支持自定义主题
   - 添加手势操作

## 开发环境

- Node.js: 18+
- Expo SDK: 53
- React Native: 0.79.5
- TypeScript: 5.8.3
