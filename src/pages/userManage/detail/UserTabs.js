import {Tabs,Card} from 'antd'
import PortraitPanel from './PortraitPanel'
import UserBasePanl from './UserBasePanl'
import UserAccountPanl from './UserAccountPanl'
import UserBaseInsurePanel from './UserBaseInsurePanel'
import UserAccountInsurePanel from './UserAccountInsurePanel'
import CreditBusPanel from './CreditBusPanel'
import InsureBusPanel from './InsureBusPanel'
import AttachmentPanel from './AttachmentPanel'
import ClassTagPanel from './ClassTagPanel'

const TabPane = Tabs.TabPane;
const UserTabs=({tabProps})=>{

  const portraitPanelPorps={
    tabProps
  }
  const {dispatch,userBaseInfo,accountInfo,creditList,insureList,creditPagination,insurePagination,fileList,pics,userNo,idCard,codes,userTagList,allData
  ,checkedValues,showTagModel,tagItem}=tabProps

  const userBasePanelPorps={
    dispatch,
    userBaseInfo
  }
  const attachmentPanelPorps={
    dispatch,
    fileList,
    pics,
    userNo,
    idCard,
    codes
  }
  const classTagPanelPorps={
    dispatch,
    userTagList,
    allData,
    checkedValues,
    showTagModel,
    tagItem
  }
  function callback(key) {

    switch (key) {
      case 'credit_basic':
        dispatch({ type: 'userDetail/queryUserBasicInfo',payload:{type:1}});
        break
      case 'credit_account':
        dispatch({ type: 'userDetail/queryUserAccountInfo',payload:{type:1}});
        break
      case 'insure_account':
        dispatch({ type: 'userDetail/queryUserAccountInfo',payload:{type:2}});
        break
      case 'insure':
        dispatch({ type: 'userDetail/queryUserBasicInfo',payload:{type:2}});
        break
      case 'insure_basic':
        dispatch({ type: 'userDetail/queryUserBasicInfo',payload:{type:2}});
        break
      case 'credit_bus':
        dispatch({ type: 'userDetail/queryUserLoanInfo',payload:{pageNo:1,pageSize:10}});
        break
      case 'insure_bus':
        dispatch({ type: 'userDetail/queryUserInsuranceInfo',payload:{pageNo:1,pageSize:10}});
        break
      case 'portrait':
        dispatch({ type: 'userDetail/queryUserPortraitList'});
        break
      case 'credit_att':
        dispatch({ type: 'userDetail/queryFileList'});
        dispatch({ type: 'userDetail/queryCodes'});//获取码表
        break
      case 'tags':
        // dispatch({ type: 'userDetail/queryAllHash'});
        dispatch({ type: 'userDetail/queryUserTagClassList'});
        break
      default:
        break
    }
  }
  return(
    <div style={{marginTop:'16px'}} >
      <Tabs defaultActiveKey="credit" onChange={callback}  >
        <TabPane tab="信贷档案" key="credit">
          <div className="subTab">
            <Tabs defaultActiveKey="credit_basic" onChange={callback} className="subTabs">
              <TabPane tab="基本信息" key="credit_basic">
                <UserBasePanl {...userBasePanelPorps}/>
              </TabPane>
              <TabPane tab="业务信息" key="credit_bus">
                <CreditBusPanel creditList={creditList} pagination={creditPagination} dispatch={dispatch}/>
              </TabPane>
              <TabPane tab="账户信息" key="credit_account">
                <UserAccountPanl accountInfo={accountInfo}/>
              </TabPane>
              <TabPane tab="附件信息" key="credit_att">
                <AttachmentPanel {...attachmentPanelPorps}/>
              </TabPane>
              {/*<TabPane tab="后续扩展" key="credit_ex"></TabPane>*/}
            </Tabs>
          </div>
        </TabPane>
        <TabPane tab="保险档案" key="insure">
          <div className="subTab">
            <Tabs defaultActiveKey="insure_basic" onChange={callback} className="subTabs">
              <TabPane tab="基本信息" key="insure_basic">
                <UserBaseInsurePanel {...userBasePanelPorps}/>
              </TabPane>
              <TabPane tab="业务信息" key="insure_bus">
                <InsureBusPanel insureList={insureList} pagination={insurePagination} dispatch={dispatch} />
              </TabPane>
              <TabPane tab="账户信息" key="insure_account">
                <UserAccountInsurePanel accountInfo={accountInfo}/>
              </TabPane>
            </Tabs>
          </div>
        </TabPane>
        <TabPane tab="画像档案" key="portrait">
          <PortraitPanel {...portraitPanelPorps}/>
        </TabPane>
        <TabPane tab="标签信息" key="tags">
          <ClassTagPanel {...classTagPanelPorps}/>
        </TabPane>
        {/*<TabPane tab="用户数据分析" key="user"></TabPane>*/}
        {/*<TabPane tab="行为日志" key="logs">*/}
        {/*</TabPane>*/}
      </Tabs>
    </div>
  )
}

export default UserTabs
