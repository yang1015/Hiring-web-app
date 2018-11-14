

export function getRedirectionPath(user) {
    // 根据用户信息 跳转不同组件
    let redirectionUrl = user.type === "applicant"? "/applicant" : "/boss";
    if (!user.avatar) redirectionUrl += 'info';

    return redirectionUrl;
}