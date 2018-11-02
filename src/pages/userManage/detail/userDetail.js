import { Tabs,Card } from 'antd'
import React from 'react'
import {connect} from 'dva'
import { withRouter } from 'dva/router'
import UserTabs from './UserTabs'
import  {getQueryString} from '../../../utils/utils'

import Head from './Head'

const TabPane = Tabs.TabPane;

class userDetail extends React.Component {
  componentDidMount(){
    const { dispatch } = this.props
    const  idCard=getQueryString('idCard')
    const  userNo=getQueryString('userNo')
    dispatch({type:'userDetail/saveIdCardAndUserNo',payload:{userNo,idCard}})
    dispatch({ type: 'userDetail/queryUserTagClassList',payload:{idCard,type:1}});
    dispatch({ type: 'userDetail/queryUserBasicInfo',payload:{idCard,type:1}});

  }



  render () {
    const { userNo,dispatch,idCard }=this.props
    const headProps={
      dispatch,
      userNo
    }
    const userProps={
      dispatch,
      userNo,
      idCard
    }


    return (
      <div>
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
