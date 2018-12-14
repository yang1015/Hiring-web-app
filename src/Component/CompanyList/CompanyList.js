import React from 'react';
import UserCard from '../UserCard/UserCard.js';
import {connect} from 'react-redux';
import { getUserList } from '../../Redux/chatUser.redux.js';

@connect(
    state => state.chatUser,
    {getUserList}
)
class CompanyList extends React.Component{
    componentDidMount(){
        this.props.getUserList('applicant');
    }
    render() {
        const typeObj = {
            type: 'applicant'
        }

        return (
            <UserCard data = {this.props.userList} type = {typeObj}/>
        )
    }
}

export default CompanyList;
