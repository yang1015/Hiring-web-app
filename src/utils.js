export function getRedirectionPath(user) {
    // 根据用户信息 跳转不同组件
    console.log(user)
    let redirectionUrl;

    if (!user.avatar) {
        if (user.type === "applicant") redirectionUrl = '/applicantinfo';
        else redirectionUrl = '/bossinfo';
    } else if (user.avatar){
        if (user.type === "applicant") redirectionUrl = '/companylist';
        else redirectionUrl = '/applicantlist';
    }


    return redirectionUrl;
}

export function getChatId(chatWithId, currentUserId) {
    return [chatWithId, currentUserId].sort().join('_')
}

export function formatDuring(mss) {
    var days = parseInt(mss / (1000 * 60 * 60 * 24));
    var hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = (mss % (1000 * 60)) / 1000;
    // return days + " 天 " + hours + " 小时 " + minutes + " 分钟 " + seconds + " 秒 ";
    return  hours + " 小时 " + minutes + "分" + seconds + '秒';
}

export function formatCreateTime(mss){
    // return mss.getHours()+":"+mss.getMinutes()+":"+mss.getSeconds();
}