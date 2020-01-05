import React, { Component } from 'react';

// 当前组件(对象)继承自组件 Component(对象)
class HelloWorld extends Component {
    // 状态, 状态的改变会重新执行 render() 方法
    state = {
        switch: 0,
        name: this.props.name1
    }

    // 在构造函数上添加点击处理方法
    clickHander = () => {

        const { name1, name2 } = this.props;

        if (this.state.switch === 0) {
            console.log(name1);
            // 设置状态(该方法是异步方法, 将会在下一轮事件循环中执行)
            this.setState({
                switch: 1,
                name: name2
            })
            // 立即打印当前状态中的 name 
            //console.log(this.state.name);// 并不是刚刚设置的 'Jason'
        } else {
            console.log(name2);
            this.setState({
                switch: 0,
                name: name2
            });
        }
    }
    // ref 回调方法 每当render函数执行一次，ref的回调函数也会执行一次。
    refCallback = (elem) => {
        //console.log(elem);
    }

    // 组件渲染完成会执行的方法
    componentDidMount(props) {
        console.log(this.refs)
    }

    // 渲染 DOM
    render() {
        return (
            <div onClick={this.clickHander}>
                {this.props.name} say: Hello,World!!
                <div ref="hello" className="hello">Hello</div>
                <div ref={this.refCallback} className="world">World</div>
            </div>
        );
    }
}

export default HelloWorld;