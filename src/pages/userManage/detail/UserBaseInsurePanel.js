import { Row,Col,Card,Table } from 'antd'
import { Link } from 'react-router-dom'
const UserBasePanl = ({ dispatch,userBaseInfo})=>{


  const columns = [
    {
      title: '档案编号',
      dataIndex: 'userNo',
      key: 'userNo'
    }, {
      title: '用户姓名',
      dataIndex: 'archiveUserNames',
      key: 'archiveUserNames'
    }, {
      title: '性别',
      dataIndex: 'sex',
      key: 'sex'
    }, {
      title: '年龄',
      dataIndex: 'age',
      key: 'age'
    },{
      title:'是被保人的',
      dataIndex:'isRecognizee',
      key:'isRecognizee'
    }, {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <Link to="#">转到用户档案</Link>
      )
    }
  ]

  const filterData=(val)=>{
    if (val === undefined || val === 'None' || val === '' || val === null)
      return '暂无'
    else
      return val
  }


  return(
    <>
    <Card style={{lineHeight:'2'}}>
      <Row type="flex" justify="space-around">
        <Col span={6}>姓名：{filterData(userBaseInfo.userName)}</Col>
        <Col span={6}>生日：{filterData(userBaseInfo.birthday)}</Col>
        <Col span={6}>年龄：{filterData(userBaseInfo.age)}</Col>
      </Row>
      <Row type="flex"  justify="space-around">
        <Col span={6}>性别：{filterData(userBaseInfo.sex)}</Col>
        <Col span={6}>学历：{filterData(userBaseInfo.education)}</Col>
        <Col span={6}>注册时间：{filterData(userBaseInfo.regTime)}</Col>
      </Row>

      <Row type="flex" className="manageTop"  justify="space-around">
        <Col span={6}>证件类型：{filterData(userBaseInfo.certType)}</Col>
        <Col span={6}>电子邮箱：{filterData(userBaseInfo.email)}</Col>
        <Col span={6}>&nbsp;</Col>
      </Row>
      <Row type="flex"   justify="space-around">
        <Col span={6}>证件号：{filterData(userBaseInfo.certNo)}</Col>
        <Col span={6}>居住地址：{filterData(userBaseInfo.residentDetailAddress)}</Col>
        <Col span={6}>&nbsp;</Col>
      </Row>
      <Row type="flex"  justify="space-around" >
        <Col span={6}>证件有效期：{filterData(userBaseInfo.certExpire)}</Col>
        <Col span={6}>联系地址：{filterData(userBaseInfo.commonContact)}</Col>
        <Col span={6}>&nbsp;</Col>
      </Row>
      <Row type="flex"  justify="space-around">
        <Col span={6}>联系电话：{filterData(userBaseInfo.phone)}</Col>
        <Col span={6}>家庭地址：{filterData(userBaseInfo.homeAddress)}</Col>
        <Col span={6}>&nbsp;</Col>
      </Row>
      <Row type="flex"  justify="space-around">
        <Col span={6}>微信号：{filterData(userBaseInfo.weixin)}</Col>
        <Col span={6}>办公地址：{filterData(userBaseInfo.workDetailAddress)}</Col>
        <Col span={6}>&nbsp;</Col>
      </Row>
      <Row type="flex"  justify="space-around">
        <Col span={6}>职业：{filterData(userBaseInfo.work)}</Col>
        <Col span={6}>常用联系地址地址：{filterData(userBaseInfo.contactAddress)}</Col>
        <Col span={6}>&nbsp;</Col>
      </Row>
      <Row type="flex"  justify="space-around">
        <Col span={6}>数据来源：{filterData(filterData.dataSource)}</Col>
        <Col span={6}>投保职业等级：{filterData(userBaseInfo.insureWorkLevel)}</Col>
        <Col span={6}>&nbsp;</Col>
      </Row>
      <Row type="flex"  justify="space-around">
        <Col span={6}>婚姻状态：{filterData(userBaseInfo.marryStatus)}</Col>
        <Col span={6}>房屋类型：{filterData(userBaseInfo.houseType)}</Col>
        <Col span={6}>&nbsp;</Col>
      </Row>
      <Row type="flex"  justify="space-around">
        <Col span={6}>财产所在地：{filterData(userBaseInfo.assetsAddress)}</Col>
        <Col span={6}>是否有医保：{filterData(userBaseInfo.isMedicalInsurance)}</Col>
        <Col span={6}>&nbsp;</Col>
      </Row>
      <Row type="flex" justify="space-around" >
        <Col span={6}>身高：{filterData(userBaseInfo.height)}</Col>
        <Col span={6}>体重：{filterData(userBaseInfo.weight)}</Col>
        <Col span={6}>&nbsp;</Col>
      </Row>
      <Row type="flex"  justify="space-around">
        <Col span={6}>年收入：{filterData(userBaseInfo.yearSalary)}</Col>
        <Col span={6}>国籍：{filterData(userBaseInfo.nationality)}</Col>
        <Col span={6}>&nbsp;</Col>
      </Row>
    </Card>
    <Card title="用户关系" className="card_pa" style={{padding:'0px'}}>
      <Table columns={columns} dataSource={userBaseInfo.userRelationList} rowKey="userNo" />
    </Card>
    </>
  )
}

export default UserBasePanl
