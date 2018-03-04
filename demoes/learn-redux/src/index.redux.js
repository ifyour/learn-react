const ADD_GUN = '加机关枪';
const REMOVE_GUN = '减机关枪';

// 定义 reducer
// ----------------------------------
export const counter = (state = 0, action) => {
    switch (action.type) {
        case ADD_GUN:
            return state + 1;
        case REMOVE_GUN:
            return state - 1;
        default:
            return 10;
    }
}

// action creater
// ------------------------------------
export const addgun = () => ({type: ADD_GUN});
export const removegun = () => ({type: REMOVE_GUN});
export const addgunAsyac = () => dispatch => {
    setTimeout(() => {
        dispatch(addgun())
    }, 1000);
}