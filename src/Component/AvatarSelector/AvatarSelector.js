import React from 'react';
import {Grid} from 'antd-mobile';

const avatarList =
    'boy,girl,man,woman,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale,zebra'
        .split(',')
        .map(val => ({
            icon: require(`./avatars/${val}.png`),
            text: val
        }));

class AvatarSelector extends React.Component {
    render() {
        return <Grid data = {avatarList} columnNum = {5}></Grid>

    }
}

export default AvatarSelector;