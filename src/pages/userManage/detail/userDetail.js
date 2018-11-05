import React from 'react'
import {connect} from 'dva'
import UserTabs from './UserTabs'
import  {getQueryString} from '../../../utils/utils'
import Head from './Head'


class userDetail extends React.Component {
  componentDidMount(){
    const { dispatch } = this.props
    const  idCard=getQueryString('idCard')
    const  userNo=getQueryString('userNo')
    dispatch({type:'userDetail/save',payload:{userNo,idCard}})
    dispatch({ type: 'userDetail/queryUserTagClassList'});//获取用户taglist
    dispatch({ type: 'userDetail/queryUserBasicInfo',payload:{type:1}});//获取用户级别信息
    dispatch({ type: 'userDetail/queryUserInfo'});//获取公共用户信息
    dispatch({ type: 'userDetail/queryUserRemark'});//获取公共用户信息
  }



  render () {
    const { userNo,dispatch,idCard,userInfo,showModel,userTagList,description }=this.props
    const tabProps=this.props
    const headProps={
      dispatch,
      userNo,
      userInfo,
      showModel,
      userTagList,
      description
    }
    const userProps={
      dispatch,
      userNo,
      idCard,
      tabProps
    }

    return (
      <div id="userDetail">
        <Head {...headProps}/>
        <UserTabs {...userProps}/>

      </div>
    )
  }

}
function mapStateToProps(state) {
  return {
    ...state.userDetail
  }
}
export default connect(mapStateToProps)(userDetail)
