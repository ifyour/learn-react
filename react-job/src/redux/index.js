// 合并多个 reducer 
import { combineReducers } from 'redux';
import { user } from './user.redux';
import { chatuser } from './chatuser.redux';
import { chat } from './chat.redux';

// 返回出合并的结果
export default combineReducers({ user, chatuser, chat });