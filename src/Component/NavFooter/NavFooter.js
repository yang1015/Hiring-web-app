import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import {TabBar} from 'antd-mobile';

import { connect } from 'react-redux';

@withRouter
@connect(
    state => state.chat
)
class NavFooter extends React.Component {
    static propTypes = {
        data: PropTypes.array.isRequired
    }

    render() {
        return (
            <TabBar>
                {
                    this.props.data.map(item => (
                            <TabBar.Item
                                title={item.text}
                                key={item.url}
                                icon={{uri: require(`./img/${item.icon}.png`)}}
                                selected={item.url === this.props.location.pathname}
                                selectedIcon={{uri: require(`./img/${item.icon}-active.png`)}}
                                onPress={
                                    () => {
                                        this.props.history.push(item.url)
                                    }}
                                badge = {item.url === "/msglist"? this.props.unread: ''}
                            >
                            </TabBar.Item>
                        )
                    )
                }
            </TabBar>

        )
    }
}

export default NavFooter;

