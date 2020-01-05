/**
 * 获取跳转路径: 未完善头像则去个人完善信息页
 * @param {Object} 用户类型, 头像
 */
export const getRedirectPath = ({ type, avatar }) => {
    let url = type === 'boss' ? '/boss' : '/genius';
    if (!avatar) url += 'info';
    return url;
}
/**
 * 获取与我有关的所有消息
 * @param {String} fromID 消息发送方 ID
 * @param {String} targetID 消息接收方 ID
 */
export const getChatAboutMe = (fromID, targetID) => [fromID, targetID].sort().join('_');