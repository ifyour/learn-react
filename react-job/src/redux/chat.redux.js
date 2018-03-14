import axios from 'axios';
import io from 'socket.io-client';
const curSocket = io('ws://localhost:9093/');

// action type
// -------------------------------------------
const MSG_LIST = 'MSG_LIST';
const MSG_RECV = 'MSG_RECV';
const MSG_READ = 'MSG_READ';

const initState = {
    chatmsg: [],
    unread: 0
}

// reducer
// -------------------------------------------
export const chat = (state = initState, action) => {
    switch(action.type) {
        case MSG_LIST:
            return { ...state, chatmsg: action.payload, unread: action.payload.filter(v=>!v.read).length  }
        case MSG_RECV:
            return { ...state, chatmsg:[...state.chatmsg, action.payload], unread: state.unread + 1 }
        default:
            return state;
    }
}

// action
// -------------------------------------------
export const msgLisg = msgs => ({ type: MSG_LIST, payload: msgs })
export const msgRecv = msg =>({ type: MSG_RECV, payload: msg })

// 从数据库中获取 msg 列表
export const getMsgList = () => dispatch => {
    axios.get('/user/msglist')
        .then(res => {
            if (res.status === 200 && res.data.code === 0) {
                dispatch(msgLisg(res.data.msgs))
            }
        })
}
// 发送消息
export const sendMsg = ({ from, to , msg }) => dispatch => {
    curSocket.emit('sendMsg', { from, to, msg })
}
// 接收消息
export const recvMsg = () => dispatch => {
    curSocket.on('receiveMsg', msg => {
        dispatch(msgRecv(msg))
    })
}