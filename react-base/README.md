### 预览项目
1. 克隆项目到本地
```bash
git clone https://github.com/ifyour/learn-react.git
```

2. 安装依赖
```bash
cd learn-react/demoes/first-app
npm install
```

3. 运行项目
```bash
npm start
```

### 主要内容

- 如何通过 `create-react-app` 快速创建一个项目
- 理解基本的解构语法, 理解 `export default` 含义
- 设置默认状态与数据
- 定义点击事件执行逻辑
- 渲染组件

### 重点掌握的内容

- 组件如何创建
- 组件如何划分
- 父子组件之间如何交互
- 兄弟组件之间如何交互
- 完全没什么关系的两个组件如何交互

### Demo

1. Helloworld
```bash
Hellowordl.jsx
```
这个例子中, 展示了一些基本的语法, 包括: 解构语法/设置状态/事件逻辑/渲染组件.


2. 一个 Dialog 小组件
```bash
App.jxs
    Button.jsx
    Dialog.jxs
```
这个例子中, 展示了如何简单封装一个组件, 父子组件如何通信, 例如: 父组件通过 `props` 给子组件传递数据, 而子组件通过调用父组件的方法进行通信. 同样的, 兄弟节点之间的交互, 也可以在父节点中进行, 通过父节点的方法来向2个子组件交互.

3. News 组件
```bash
News.jsx
```
这个例子, 展示的是一个异步组件, 通过 Ajax 获取 知乎 API 的例子, 学习了如何在 React 中通过接口渲染数据.

4. 高阶组件
```bash
basic.jsx
Addsss.jsx
```
这个例子, 主要是理解 React 中的高阶组件是怎样一回事, 简单理解就是通过普通组件外层包一层逻辑返回.
