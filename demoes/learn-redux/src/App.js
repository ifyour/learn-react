import React from "react";
import { connect } from 'react-redux';
import { addgun, removegun, addgunAsyac } from './index.redux'

// 使用 babel 插件 transform-decorators-legacy , 采用装饰器写法
@connect(
    // 需要什么 state 放入到 props 里
    state => ({num: state.counter}),
    // 有哪些变更 state 的 action 方法, 这些都能自动进行 dispatch 任务(React-redux 包装后)
    { addgun, removegun, addgunAsyac }
)

class App extends React.Component {
    render() {
        const { num, addgun, removegun, addgunAsyac } = this.props; 
        return (
            <div>
                <h1>机枪{ num }把!</h1>
                <button onClick={ addgun }>申请武器</button>
                <button onClick={ removegun }>回收武器</button>
                <button onClick={ addgunAsyac }>延迟 1s 增加 1 把武器</button>
            </div>
        )
    }
}

// 对比上面 @connect 的写法, 上面采用了 babel 插件来优化 connect 写法

// // 把 state 转成 props, 回调函数, 接收 state
// const mapStatetoProps = state =>({num: state});
// // 定义 redux 需要的 action
// const actionCreaters = { addgun, removegun, addgunAsyac };
// // 使用 react-redux 装饰模式, 先执行connect 方法, 返回一个包装函数, 然后包装 App 组件
// App = connect(mapStatetoProps, actionCreaters)(App);

export default App;