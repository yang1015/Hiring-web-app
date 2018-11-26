import React from 'react';
import {Card, WingBlank, WhiteSpace} from 'antd-mobile';

class UserCard extends React.Component {
    render() {
        return (
            <WingBlank size="lg">
                <WhiteSpace size="lg"/>
                <Card>
                    {
                        this.props.data.map(user => {
                            if (user.avatar) {
                                return (
                                    <div key = {user._id}>
                                        <Card.Header
                                            title={user.user}
                                            thumb = {require(`../../images/avatars/${user.avatar}.png`)}
                                            extra={<span>{user.jobHunting}</span>}
                                        />
                                        <Card.Body>
                                            <div>{user.brief}</div>
                                        </Card.Body>
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