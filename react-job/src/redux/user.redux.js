import axios from 'axios';
import { getRedirectPath } from '../utils/util';

// action type
// ----------------------------------------
const AUTH_SUCCESS = 'AUTH_SUCCESS';
const ERROR_MSG = 'ERROR_MSG';
const LOAD_DATA = 'LOAD_DATA';
const LOGOUT = 'LOGOUT';
const LOGIN = 'LOGIN';

const initState = {
    redirectTo: '',
    msg: '',
    user: '',
    type: ''
}

// reducer
// ----------------------------------------
export const user = (state = initState, action) => {
  switch(action.type) {
    case AUTH_SUCCESS:
        return { ...state, redirectTo: getRedirectPath(action.payload), msg: '', ...action.payload }
    case LOAD_DATA:
        return { ...state, ...action.payload }
    case ERROR_MSG:
        return { ...state, msg: action.msg }
    case LOGOUT:
        return { ...initState, redirectTo: '/login' }
    case LOGIN:
        return { ...initState, redirectTo: '/register' }
    default:
        return state;
  }
}

// action create
// ----------------------------------------
export const errorMsg = msg => ({msg, type: ERROR_MSG})
export const loadUserInfo = (userinfo) =>({ payload: userinfo, type: LOAD_DATA })
export const updateSuccess = (data) => ({ payload: data, type: AUTH_SUCCESS })
export const logoutSubmit  = () =>({ type: LOGOUT })
export const registerSubmit  = () =>({ type: LOGIN })

export const update = (data) => (dispatch) => {
    axios.post('/user/update', data)
        .then( res => {
            if (res.status === 200 && res.data.code === 0) {
                dispatch(updateSuccess(res.data.data))
            } else {
                dispatch(errorMsg('res.msg'))
            }
        })
}
export const register = ({ user, pwd, repeatpwd, type }) => {
  if (!user || !pwd || !type) {
        return errorMsg('用户名和密码必须输入')
  }
  if (pwd !== repeatpwd) {
        return errorMsg('两次密码不一致')
  }
  // create action 中的异步方法需要用到回调中的 dispatch 方法来触发 action
  return dispatch => {
    axios.post('/user/register', { user: user.trim(), pwd: pwd.trim(), type })
        .then(res =>{
            if(res.status === 200 && res.data.code === 0) {
                // 注册成功
                dispatch(updateSuccess({ user, pwd, type }));
            } else {
                dispatch(errorMsg(res.data.msg))
            }
        })
  }
}
export const login = ({ user, pwd }) => {
  if (!user || !pwd) {
        return errorMsg('用户名和密码必须输入')
  }
  return dispatch => {
    axios.post('/user/login', { user: user.trim(), pwd: pwd.trim() })
        .then(res =>{
            if(res.status === 200 && res.data.code === 0) {
                // 登录成功
                dispatch(updateSuccess(res.data.data));
            } else {
                dispatch(errorMsg(res.data.msg))
            }
        })
  }
}