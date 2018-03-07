import axios from 'axios';
import { getRedirectPath } from '../util';

const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const ERROR_MSG = 'ERROR_MSG';
const initState = {
    redirectTo: '',
    isAuth: false,
    msg: '',
    user: '',
    pwd: '',
    type: ''
}

// reducer
// ----------------------------------------
export const user = (state = initState, action) => {
  switch(action.type) {
    case REGISTER_SUCCESS:
        return {...state, isAuth: true, redirectTo: getRedirectPath(action.payload), msg: '', ...action.payload}
    case LOGIN_SUCCESS:
        return {...state, isAuth: true, redirectTo: getRedirectPath(action.payload), msg: '', ...action.payload}
    case ERROR_MSG:
        return {...state, isAuth: false, msg: action.msg}
    default:
        return state;
  }
}

// action creater
// ----------------------------------------
export const errorMsg = msg => ({msg, type: ERROR_MSG})
export const registerSuccess = (data) => ({ payload: data, type: REGISTER_SUCCESS })
export const loginSuccess = (data) => ({ payload: data, type: LOGIN_SUCCESS})

export const register = ({ user, pwd, repeatpwd, type }) => {
  if (!user || !pwd || !type) {
        return errorMsg('用户名和密码必须输入')
  }
  if (pwd !== repeatpwd) {
        return errorMsg('两次密码不一致')
  }
  return dispatch => {
    axios.post('/user/register', { user, pwd, type })
        .then(res =>{
            if(res.status === 200 && res.data.code === 0) {
                // 注册成功
                dispatch(registerSuccess({ user, pwd, type }));
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
                dispatch(loginSuccess(res.data.data));
            } else {
                dispatch(errorMsg(res.data.msg))
            }
        })
  }
}