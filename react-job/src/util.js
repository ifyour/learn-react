// 用户登陆后 url 跳转
export const getRedirectPath = ({ type, avatar }) => {
    let url = type === 'boss' ? '/boss' : '/genius';
    if (!avatar) url += 'info';
    return url;
}
