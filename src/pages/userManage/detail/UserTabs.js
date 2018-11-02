import {Tabs,Card} from 'antd'

const TabPane = Tabs.TabPane;
const UserTabs=({})=>{


  function callback(key) {
    console.log(key);
  }
  return(
    <Card style={{marginTop:'16px'}}>
      <Tabs defaultActiveKey="credit" onChange={callback}>
        <TabPane tab="信贷档案" key="credit">
          <Tabs defaultActiveKey="credit_basic" onChange={callback}>
            <TabPane tab="基本信息" key="credit_basic">Content of Tab Pane 2</TabPane>
            <TabPane tab="账户信息" key="credit_account">Content of Tab Pane 2</TabPane>
            <TabPane tab="附件信息" key="credit_att">Content of Tab Pane 2</TabPane>
            <TabPane tab="业务信息" key="credit_bus">Content of Tab Pane 2</TabPane>
            <TabPane tab="后续扩展" key="credit_ex">Content of Tab Pane 2</TabPane>
          </Tabs>
        </TabPane>
        <TabPane tab="保险档案" key="insure">
          <Tabs defaultActiveKey="insure_basic" onChange={callback}>
            <TabPane tab="基本信息" key="insure_basic">Content of Tab Pane 2</TabPane>
            <TabPane tab="业务信息" key="insure_bus">Content of Tab Pane 2</TabPane>
            <TabPane tab="账户信息" key="insure_account">Content of Tab Pane 2</TabPane>
          </Tabs>
        </TabPane>
        <TabPane tab="画像档案" key="portrait">Content of Tab Pane 3</TabPane>
        <TabPane tab="标签信息" key="tags">Content of Tab Pane 1</TabPane>
        <TabPane tab="用户数据分析" key="user">Content of Tab Pane 2</TabPane>
        <TabPane tab="行为日志" key="logs">Content of Tab Pane 3</TabPane>
      </Tabs>
    </Card>
  )
}

export default UserTabs
