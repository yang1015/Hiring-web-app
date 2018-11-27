

export function getRedirectionPath(user) {
    // 根据用户信息 跳转不同组件
    console.log(user)
    let redirectionUrl;
    if (!user.avatar) {
        if (user.type === "applicant") redirectionUrl = '/applicantinfo';
        else redirectionUrl = '/bossinfo';
    } else {
        if (user.type === "applicant") redirectionUrl = '/companylist';
        else redirectionUrl = '/applicantlist';
    }

    return redirectionUrl;
}