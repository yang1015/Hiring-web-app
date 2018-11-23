

export function getRedirectionPath(user) {
    // 根据用户信息 跳转不同组件
    console.log(user)
    let redirectionUrl = user.type === "applicant"? "/applicant" : "/boss";
    if (!user.avatar) redirectionUrl += 'info';

    return redirectionUrl;
}