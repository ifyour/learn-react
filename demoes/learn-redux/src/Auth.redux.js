const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'

// 定义 reducer
// ---------------------------------------------------
export const auth = (state={ isAuth: false, user: '李云龙'}, action) => {
    switch(action.type) {
        case LOGIN:
            return { ...state,  isAuth: true}
        case LOGOUT:
            return { ...state,  isAuth: false}
        default:
            return state;
    }
}


// 定义 action
// ---------------------------------------------------
export const login = () =>({type: LOGIN})
export const logout = () =>({type: LOGOUT})