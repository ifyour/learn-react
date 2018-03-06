// src/App.jsx
import React, { Component } from 'react';
import Button from './Button';
import Dialog from './Dialog';
import './style.css';

class App extends Component {
    state = {
        loading: false,
        dialog: false,
        message: 'xxx'
    }

    submit = () => {
        this.setState({
            loading: true
        })

        // 模拟数据请求的过程，假设数据请求会经历1s得到结果
        setTimeout(() => {

            // 通过随机数的方式模拟可能出现的成功与失败两种结果
            const res = Math.random(1);
            if (res > 0.5) {
                this.setState({
                    dialog: true,
                    message: '提交成功！'
                })
            } else {
                this.setState({
                    dialog: true,
                    message: '提交失败！'
                })
            }
            this.setState({ loading: false })
        }, 1000)
    }

    close = () => {
        this.setState({
            dialog: false
        })
    }

    render() {

        const { loading, dialog, message } = this.state;

        return (
            <div className="app-wrap">
                <Button loading={loading} submit={this.submit}>提交</Button>
                {dialog && <Dialog message={message} close={this.close} />}
            </div>
        )
    }
}

export default App;