# 1.0.0

- 轮盘基本功能

# 1.0.1

- 修复 Web 端 window is not defined 报错，storage 持久化多端兼容（Web 使用 localStorage，原生使用 AsyncStorage，自动降级 noop storage）
- 阴影样式 shadow* 属性在 Web 端弃用，统一用 boxShadow/textShadow，原生端保留 shadow*，多端视觉一致
- 优化 redux-persist 警告处理，忽略非序列化 action 警告
- 新增删除转盘功能，支持删除指定转盘
- 实现自定义确认对话框，替代不兼容的 Alert.alert
- 删除当前选中转盘时自动切换到第一个转盘
- 优化转盘列表 UI，添加删除按钮图标
- 解决 Alert.alert 在某些环境下不工作的问题
