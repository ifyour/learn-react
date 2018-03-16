import axios from 'axios';
import io from 'socket.io-client';
const socket = io('ws://localhost:9093/');

// action type
// -------------------------------------------
const MSG_LIST = 'MSG_LIST';
const MSG_RECV = 'MSG_RECV';
const MSG_READ = 'MSG_READ';

const initState = {
    chatmsg: [],
    users: {},
    unread: 0
}

// reducer
// -------------------------------------------
export const chat = (state = initState, action) => {
    switch(action.type) {
        case MSG_LIST:
            return { ...state, 
                users: action.payload.users, 
                chatmsg: action.payload.msgs, 
                unread: action.payload.msgs.filter(v=>!v.read && v.to === action.payload.userid).length // 未读 && 发送给我的
            }
        case MSG_RECV:
            const n = action.payload.msg.to === action.payload.userid ? 1 : 0; // 发送给我的 + 1
            return { ...state, chatmsg:[...state.chatmsg, action.payload.msg], unread: state.unread + n }
        default:
            return state;
    }
}

// action
// -------------------------------------------
export const msgLisg = (msgs, users, userid) => ({ type: MSG_LIST, payload: { msgs, users, userid } })
export const msgRecv = (msg, userid) =>({ type: MSG_RECV, payload: { msg, userid } })

// 从数据库中获取 msg 列表
export const getMsgList = () => (dispatch, getState) => {
    axios.get('/user/msglist')
        .then(res => {
            if (res.status === 200 && res.data.code === 0) {
                const msgs = res.data.msgs;// 与我有关的消息列表
                const users = res.data.users;// 所有用户的名称和头像数据
                const userid = getState().user._id;// 当前已登录用户
                dispatch(msgLisg(msgs, users, userid))
            }
        })
}

// 发送消息
export const sendMsg = ({ from, to , msg }) => dispatch => {
    socket.emit('sendMsg', { from, to, msg })
}

// 接收消息
export const recvMsg = () => (dispatch, getState) => {
    socket.on('receiveMsg', msg => {
        const userid = getState().user._id;
        dispatch(msgRecv(msg, userid))
    })
}

// 页面销毁时移除 receiveMsg 监听
// 冗余的监听会导致 socket.io 卡顿, 和重复的消息接收
export const removeRecvMsg = () => dispatch => {
    socket.removeListener('receiveMsg')
}