import axios from 'axios';

const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'
const USER_DATA = 'USER_DATA'
const defaultState = {
    isAuth: false, 
    user: '李云龙',
    age: 20
}

// 定义 reducer
// ---------------------------------------------------
export const auth = (state = defaultState, action) => {
    switch(action.type) {
        case LOGIN:
            return { ...state,  isAuth: true}
        case LOGOUT:
            return { ...state,  isAuth: false}
        case USER_DATA:
            return { ...state, user: action.payload.user, age: action.payload.age }
        default:
            return state;
    }
}


// 定义 action
// ---------------------------------------------------
export const login = () =>({type: LOGIN})
export const logout = () =>({type: LOGOUT})
export const userData = (data) =>({type: USER_DATA, payload: data})
// 异步获取用户信息数据，交给 redux 管理，经过装饰器包装，回调函数的参数 dispatch 用于派发任务
export const getUserData = () => dispatch => {
    // package.json 里配置了 proxy 中转 localhost:9093 来解决跨域
    axios.get('/data')
        .then(res => {
            res.status === 200 && dispatch(userData(res.data));
        })
}