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
        this.props.history.push(`/chat/${User.user}`); // 如果没有import withRoute就会报错this找不到
    }

    render() {
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
                                            <Card.Header
                                                title={user.user}
                                                thumb={require(`../../images/avatars/${user.avatar}.png`)}
                                                extra={<span>{user.jobHunting}</span>}
                                            />
                                            :
                                            <Card.Header
                                                title={user.user}
                                                thumb={require(`../../images/avatars/${user.avatar}.png`)}
                                                extra={<span>{user.jobTitle}</span>}
                                            />

                                    }
                                    {
                                        user.type === 'applicant' ?
                                            <Card.Body>
                                                <div>{user.brief}</div>
                                                <div>薪资: {user.applicantSalary}</div>
                                            </Card.Body>
                                            :
                                            <Card.Body>
                                                <div>公司：{user.bossCompany}</div>
                                                <div>{user.jobDesc}</div>
                                                <div>薪资: {user.bossSalary}</div>
                                            </Card.Body>
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