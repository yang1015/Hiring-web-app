import React from 'react';
import {Grid, WingBlank} from 'antd-mobile';

const avatarList =
    'boy,girl,man,woman,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale,zebra'
        .split(',')
        .map(val => ({
            icon: require(`../../images/avatars/${val}.png`),
            text: val
        }));

class AvatarSelector extends React.Component {
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
        this.props.selectAvatar(e.text)
    }

    render() {
        return (
            <div>
                <WingBlank>
                    {
                        this.state.avatarSrc ?
                            <p className = "passed tip"> 已选择：
                                <img style = {{width: 40}} src={this.state.avatarSrc}/></p>
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