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
            return { ...state, users: action.payload.users, chatmsg: action.payload.msgs, unread: action.payload.msgs.filter(v=>!v.read).length  }
        case MSG_RECV:
            return { ...state, chatmsg:[...state.chatmsg, action.payload], unread: state.unread + 1 }
        default:
            return state;
    }
}

// action
// -------------------------------------------
export const msgLisg = (msgs, users) => ({ type: MSG_LIST, payload: { msgs, users } })
export const msgRecv = msg =>({ type: MSG_RECV, payload: msg })

// 从数据库中获取 msg 列表
export const getMsgList = () => dispatch => {
    axios.get('/user/msglist')
        .then(res => {
            if (res.status === 200 && res.data.code === 0) {
                dispatch(msgLisg(res.data.msgs, res.data.users))
            }
        })
}

// 发送消息
export const sendMsg = ({ from, to , msg }) => dispatch => {
    socket.emit('sendMsg', { from, to, msg })
}

// 接收消息
export const recvMsg = () => dispatch => {
    socket.on('receiveMsg', msg => {
        dispatch(msgRecv(msg))
    })
}

// 页面销毁时移除 receiveMsg 监听
// 冗余的监听会导致 socket.io 卡顿, 和重复的消息接收
export const removeRecvMsg = () => dispatch => {
    socket.removeListener('receiveMsg')
}