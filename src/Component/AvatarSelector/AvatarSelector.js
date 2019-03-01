import React from 'react';
import PropTypes from 'prop-types';

import {Grid, WingBlank} from 'antd-mobile';


/* antd Grid规定的一种数据展示形式 Array<{icon, text}>
* 这样也方便获取avatar的text，然后setState已选择的头像*/
const avatarList =
    'boy,girl,man,woman,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale,zebra'
        .split(',')
        .map(val => ({
            icon: require(`../../images/avatars/${val}.png`),
            text: val
        }));

class AvatarSelector extends React.Component {
    static propTypes = {
        selectAvatar: PropTypes.func.isRequired
    }
    constructor(props) {
        super(props);
        this.state = {
            avatarTxt: '',
            avatarSrc: ''
        }
        this.chooseAvatar = this.chooseAvatar.bind(this);
    }

    chooseAvatar(e) {
        this.setState({
            avatarTxt: e.text,
            avatarSrc: e.icon
        })
        /* Actions must be plain objects */
        this.props.selectAvatar(e.text); // 通知父组件我选好头像啦
    }

    render() {
        return (
            <div>
                <WingBlank>
                    {
                        this.state.avatarSrc ?
                            <p className = "passed tip"> 已选择：
                                <img style = {{width: 40}} src={this.state.avatarSrc} alt = "已选择的头像"/></p>
                            :
                            <p className = "warning tip">请选择头像</p>
                    }
                </WingBlank>

                <WingBlank>
                    <Grid
                        data={avatarList} columnNum={3}
                        onClick={this.chooseAvatar}
                    />
                </WingBlank>
            </div>
        )

    }
}

export default AvatarSelector;