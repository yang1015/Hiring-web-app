import React from 'react';
import {Card, WingBlank, WhiteSpace} from 'antd-mobile';
import PropTypes from 'prop-types';

class UserCard extends React.Component {
    static propTypes = {
        data: PropTypes.array.isRequired
    }

    render() {
        return (
            <WingBlank size="lg">
                <WhiteSpace size="lg"/>
                <Card>
                    {
                        this.props.data.map(user => {
                            if (user.avatar) {
                                return (
                                    <div key={user._id} style = {{borderRadius: '50'}}>
                                        {
                                            user.type === 'applicant'?
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
                                            user.type === 'applicant'?
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
                                     <div style = {{height: '5px', background: '#f5f5f9'}}></div>
                                    </div>
                                )
                            } else {
                                return null;
                            }

                        })
                    }
                </Card>
            </WingBlank>

        )
    }
}

export default UserCard;