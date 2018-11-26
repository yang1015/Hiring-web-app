import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import {TabBar} from 'antd-mobile';

@withRouter
class NavFooter extends React.Component {
    static propTypes = {
        data: PropTypes.array.isRequired
    }

    render() {
        return (
            <TabBar className="footer">
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