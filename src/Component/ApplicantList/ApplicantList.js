import React from 'react';
import UserCard from '../UserCard/UserCard.js';

import {connect} from 'react-redux';
import { getUserList } from '../../Redux/chatUser.redux.js';

@connect(
    state => state.chatUser,
    {getUserList}
)
class ApplicantList extends React.Component {
    componentDidMount() {
        // axios.get(`/user/list?type=${this.state.type}`)
       this.props.getUserList('boss');
    }

    render() {
        const typeObj = {
            type: 'boss'
        }

        // console.log("this.props.userList: " + this.props.userList)
        return (
            <UserCard data={this.props.userList} type = {typeObj}/>
        )
    }
}

export default ApplicantList;