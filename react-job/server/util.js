import utils from 'utility';

module.exports = {
    /**
     * md5 加密密文
     * 
     * @param {Sring} pwd 明文密码
     * @returns 加密后的 md5
     */
    md5Pwd(pwd) {
        const salt = 'mooc_job_is_good!@#qweQWE!~~~888';
        return utils.md5(utils.md5(pwd + salt));
    }
}