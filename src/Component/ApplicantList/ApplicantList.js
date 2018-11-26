import React from 'react';
import UserCard from '../UserCard/UserCard.js';

import {connect} from 'react-redux';
import { getList } from '../../Redux/chatUser.redux.js';

@connect(
    state => state.chatUser,
    {getList}
)
class ApplicantList extends React.Component {
    componentDidMount() {
        // axios.get(`/user/list?type=${this.state.type}`)
       this.props.getList('boss');
    }

    render() {
        return (
            <UserCard data={this.props.userList}/>
        )
    }
}

export default ApplicantList;