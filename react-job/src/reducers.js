// 合并多个 reducer 
import { combineReducers } from 'redux';
import { user } from './redux/user.redux';
import { chatuser } from './redux/chatuser.redux';
// 返回出合并的结果
export default combineReducers({ user, chatuser });