import React from 'react';
import { Button,List } from 'antd-mobile';

class App extends React.Component {
  render() {
    const boss = 'jack'
    return (
      <div>
        <h1>独立团：{boss}</h1>
        <Title />
      </div>
    )
  }
}

class Title extends React.Component {
  constructor() {
    super();
    this.state = {
      names: ['aaa', 'bbb', 'ccc', 'ddd']
    }
  }

  add(){
    this.setState({
      names: [...this.state.names, '路人甲' + Math.random()]
    })
  }

  render() {
    let names = this.state.names;
    return (
      <div>
        <Button type="primary" onClick={()=>this.add()}>add</Button>
        
        <List renderHeader={()=>"员工列表"}>
          {
            names.map(v => {
              return <List.Item key={v}>{v}</List.Item>
            })
          }
        </List>
      </div>
    )
  }
}

export default App











// import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';
// // import {createStore} from 'redux';
// import './es6';

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h1 className="App-title">Welcome to Imooc</h1>
//         </header>
//         <p className="App-intro">
//           To get started, edit <code>src/App.js</code> and save to reload.
//         </p>
//       </div>
//     );
//   }
// }

// export default App;
