import axios from 'axios';

const USER_LIST = 'USER_LIST';
const initState = {
    userList: []
}

// reducer
// -------------------------------------------
export const chatuser = (state = initState, action) => {
    switch(action.type) {
        case USER_LIST:
            return { ...state, userList: action.payload }
        default:
            return state
    }
}

// action
// -------------------------------------------
export const userlist = data => ({ type: USER_LIST, payload: data })
export const getUserList = type => dispatch => {
    axios.get('/user/list?type=' + type)
        .then(res => {
            if (res.data.code === 0) {
                dispatch(userlist(res.data.data))
            }
        })
}