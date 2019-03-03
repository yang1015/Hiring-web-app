import React from 'react';
import {Card, WingBlank, WhiteSpace} from 'antd-mobile';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

@withRouter
class UserCard extends React.Component {
    static propTypes = {
        data: PropTypes.array.isRequired
    }

    chatWithThisPerson(User) {
        const stringfiedObj = JSON.stringify(User);
        /* url里会直接显示用户的名字 很不安全 而_id既安全又隐私*/
       // this.props.history.push(`/chat/${User.user}`); // 如果没有import withRoute就会报错this找不到
        this.props.history.push('/chat/' + stringfiedObj);
    }

    render() {
        // console.log("user card获取的数据： " + this.props.data);
        return (
            <WingBlank size="lg">
                <WhiteSpace size="lg"/>

                {


                    this.props.data.map(user => {
                        if (user.avatar) {
                            return (
                                <Card key={user._id} style={{borderRadius: '50'}}
                                      onClick={() => this.chatWithThisPerson(user)}>
                                    {
                                        user.type === 'applicant' ?
                                            <div>
                                                <Card.Header
                                                    title={user.user}
                                                    thumb={require(`../../images/avatars/${user.avatar}.png`)}
                                                    extra={<span>{user.jobHunting}</span>}
                                                />
                                                <Card.Body>
                                                    <div>{user.brief}</div>
                                                    <div>薪资: {user.applicantSalary}</div>
                                                </Card.Body>
                                            </div>
                                            :
                                            <div>
                                                <Card.Header
                                                    title={user.user}
                                                    thumb={require(`../../images/avatars/${user.avatar}.png`)}
                                                    extra={<span>{user.jobTitle}</span>}
                                                />
                                                <Card.Body>
                                                    <div>公司：{user.bossCompany}</div>
                                                    <div>{user.jobDesc}</div>
                                                    <div>薪资: {user.bossSalary}</div>
                                                </Card.Body>
                                            </div>
                                    }

                                    <div style={{height: '5px', background: '#f5f5f9'}}></div>
                                </Card>
                            )
                        } else {
                            return null;
                        }

                    })
                }
            </WingBlank>

        )
    }
}

export default UserCard;