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
//
//
// <div>
//     {
//         userItem.avatar ?
//             (
//                 <div>
//
//                     <Result
//                         img={
//                             <img src={require(`../../images/avatars/${userItem.avatar}.png`)} alt=""
//                                  style={{width: '50px', height: '50px'}}/>}
//                         title={userItem.user}
//                         message={userItem.type === 'boss' ? userItem.bossCompany : null}
//                     >
//                     </Result>
//
//                     <List renderHeader={() => '简介'}>
//                         <Item
//                             multipleLine
//                             wrap='true'
//                         >
//                             {userItem.jobHunting} <br/>
//                             <Brief> {userItem.brief}</Brief>
//                             <Brief>期望薪资：{userItem.applicantSalary}</Brief>
//                         </Item>
//                     </List>
//                     <WhiteSpace />
//
//                     {/*<List renderHeader={() => ' '}>*/}
//                     <Button onClick = {this.logout}>退出登录</Button>
//                     {/*</List>*/}
//
//                 </div>
//             )
//
//
//             :
//             null
//     }
//
// </div>