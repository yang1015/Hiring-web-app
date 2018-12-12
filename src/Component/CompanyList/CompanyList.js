import React from 'react';
import UserCard from '../UserCard/UserCard.js';
import {connect} from 'react-redux';
import { getList } from '../../Redux/chatUser.redux.js';

@connect(
    state => state.chatUser,
    {getList}
)
class CompanyList extends React.Component{
    componentDidMount(){
        this.props.getList('applicant');
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
