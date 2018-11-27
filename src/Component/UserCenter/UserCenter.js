import React from 'react';
import {connect} from 'react-redux';
import {Result, Button, List, WhiteSpace} from 'antd-mobile';

const Item = List.Item;
const Brief = Item.Brief;

@connect(
    state => state.user
)
class UserCenter extends React.Component {
    constructor(){
        super();
        this.logout = this.logout.bind(this)
    }
    logout() {

    }
    render() {
        const userItem = this.props;
        console.log(userItem.avatar)
        return (
            <div>
                {
                    userItem.avatar ?
                        <div>
                            <Result
                                img={
                                    <img src={require(`../../images/avatars/${userItem.avatar}.png`)} alt=""
                                         style={{width: '50px', height: '50px'}}/>}
                                title={userItem.user}
                                message={userItem.type === 'boss' ? userItem.bossCompany : null}
                            >
                            </Result>
                            <List renderHeader={() => '简介'}>
                                <Item
                                    multipleLine
                                    wrap='true'
                                >
                                    {userItem.jobHunting} <br/>
                                    <Brief> {userItem.brief}</Brief>
                                    <Brief>期望薪资：{userItem.applicantSalary}</Brief>
                                </Item>
                            </List>
                            <WhiteSpace />
                            <List renderHeader={() => ' '}>
                                <Button onClick = {this.logout}>退出登录</Button>
                            </List>
                        </div>

                        :
                        null
                }

            </div>
        )
    }
}

export default UserCenter;