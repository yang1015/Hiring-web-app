import React from 'react';
import AvatarSelector from '../../Component/AvatarSelector/AvatarSelector.js';

import {List, InputItem, WhiteSpace, Button, WingBlank} from 'antd-mobile';

class BossInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
        this.submit = this.submit.bind(this);

    }

    handleChange(key, val) {
        this.setState({
            [key]: val
        });
    }

    submit() {
        console.log(this.state);
    }

    render() {
        return <div>
            <h1>bossinfo page</h1>
            <AvatarSelector/>
            <WhiteSpace/><WhiteSpace/>
            <WingBlank>
                <List>
                    <InputItem
                        onChange={val => this.handleChange('title', val)}>职位</InputItem>

                    <InputItem
                        onChange={val => this.handleChange('company', val)}>公司</InputItem>
                    <InputItem>公司</InputItem>
                </List>
                <WhiteSpace/><WhiteSpace/>
                <Button type="primary" onClick={this.submit}>注册</Button> </WingBlank>

        </div>
    }
}

export default BossInfo;