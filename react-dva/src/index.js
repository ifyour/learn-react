import dva, { connect } from 'dva';
import { Router, Route, Switch } from 'dva/router';

import styles from './index.less';
import { resolve } from 'url';

// 1. Initialize
const app = dva();

// 2. Model
app.model({
  namespace: 'count',
  state: {
    record: 0,// 最高分数
    current: 0,// 当前点击分数
  },
  reducers: {
    add(state) {
      const newCurrent = state.current + 1;
      return {
        ...state,
        record: newCurrent > state.record ? newCurrent : state.record,
        current: newCurrent
      }
    },
    minus(state) {
      return {
        ...state,
        current: state.current - 1,
      }
    },
  },
  effects: {
    *addTheMinus(action, { call, put }) {
      yield put({ type: 'add' });
      yield call(delay, 1000);
      yield put({ type: 'minus' });
    },
  },
})

// 模拟异步方法
function delay(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout)
  })
}

function mapStateToProps(state) {
  return { count: state.count }
}

const CountApp = ({ count, dispatch }) => {
  return (
    <div className={ styles.normal }>
      <div className={ styles.record }>Highest Record: { count.record }</div>
      <div className={ styles.current }>{ count.current }</div>
      <div className={ styles.button }>
        <button onClick={ () => { dispatch({ type: 'count/addTheMinus' }) } }>+</button>
      </div>
    </div>
  )
}

// 3. Router
const HomePage = connect(mapStateToProps)(CountApp);
app.router(({ history }) =>
  <Router history={history}>
    <Switch>
      <Route path="/" exact component={HomePage} />
    </Switch>
  </Router>
);

// 4. Start
app.start('#root');
