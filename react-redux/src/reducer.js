// 合并多个 reducer 
import { combineReducers } from 'redux';
import { counter } from './index.redux';
import { auth } from './Auth.redux';

// 返回出合并的结果
export default combineReducers({ counter, auth });