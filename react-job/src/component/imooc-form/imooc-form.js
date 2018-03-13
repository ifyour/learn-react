import React from 'react';
/** 
 *  理解高阶组件: 在原组件的基础上自动实现 handleChange 方法
 */
export default function ImoocForm(Comp) {
    return class WrapperComponent extends React.Component {
        constructor(props) {
            super(props)
            this.state = {}
            this.handleChange = this.handleChange.bind(this)
        }
        handleChange(key, value) {
            this.setState({
                [key]: value
            })
        }
        render() {
            // { ...this.props } 继承来自 react-redux @connect 后的  state 和 action
            //  state={} 和 handleChange={} 就是当前 WrapperComponent 组件的 state 和处理函数
            return <Comp { ...this.props } state={ this.state }  handleChange={ this.handleChange }></Comp>
        }
    }
}