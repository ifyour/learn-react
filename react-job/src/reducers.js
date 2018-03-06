// 合并多个 reducer 
import { combineReducers } from 'redux';
import { user } from './redux/user.redux';

// 返回出合并的结果
export default combineReducers({ user });