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

  return(
    <>
    <Card style={{lineHeight:'2'}}>
      <Row type="flex" >
        <Col span={6}>姓名：{userBaseInfo.userName}</Col>
        <Col span={6}>生日：{userBaseInfo.birthday}</Col>
        <Col span={6}>年龄：{userBaseInfo.age}</Col>
      </Row>
      <Row type="flex" >
        <Col span={6}>性别：{userBaseInfo.sex}</Col>
        <Col span={6}>学历：{userBaseInfo.education}</Col>
        <Col span={6}>注册时间：{userBaseInfo.regTime}</Col>
      </Row>

      <Row type="flex" >
        <Col span={8}>证件类型：{userBaseInfo.certType}</Col>
        <Col span={8}>电子邮箱：{userBaseInfo.email}</Col>
      </Row>
      <Row type="flex" >
        <Col span={8}>证件号：{userBaseInfo.certNo}</Col>
        <Col span={8}>居住地址：{userBaseInfo.residentDetailAddress}</Col>
      </Row>
      <Row type="flex" >
        <Col span={8}>证件有效期：{userBaseInfo.certExpire}</Col>
        <Col span={8}>联系地址：{userBaseInfo.commonContact}</Col>
      </Row>
      <Row type="flex" >
        <Col span={8}>联系电话：{userBaseInfo.phone}</Col>
        <Col span={8}>家庭地址：{userBaseInfo.homeAddress}</Col>
      </Row>
      <Row type="flex" >
        <Col span={8}>微信号：{userBaseInfo.weixin}</Col>
        <Col span={8}>办公地址：{userBaseInfo.workDetailAddress}</Col>
      </Row>
      <Row type="flex" >
        <Col span={8}>职业：{userBaseInfo.work}</Col>
        <Col span={8}>常用联系地址地址：{userBaseInfo.contactAddress}</Col>
      </Row>
      <Row type="flex" >
        <Col span={8}>数据来源：{userBaseInfo.dataSource}</Col>
        <Col span={8}>投保职业等级：{userBaseInfo.insureWorkLevel}</Col>
      </Row>
      <Row type="flex" >
        <Col span={8}>婚姻状态：{userBaseInfo.marryStatus}</Col>
        <Col span={8}>房屋类型：{userBaseInfo.houseType}</Col>
      </Row>
      <Row type="flex" >
        <Col span={8}>财产所在地：{userBaseInfo.assetsAddress}</Col>
        <Col span={8}>是否有医保：{userBaseInfo.isMedicalInsurance}</Col>
      </Row>
      <Row type="flex" >
        <Col span={8}>身高：{userBaseInfo.height}</Col>
        <Col span={8}>体重：{userBaseInfo.weight}</Col>
      </Row>
      <Row type="flex" >
        <Col span={8}>年收入：{userBaseInfo.yearSalary}</Col>
        <Col span={8}>国籍：{userBaseInfo.nationality}</Col>
      </Row>
    </Card>
    <Card title="用户关系" className="card_pa" style={{padding:'0px'}}>
      <Table columns={columns} dataSource={userBaseInfo.userRelationList} rowKey="userNo" />
    </Card>
    </>
  )
}

export default UserBasePanl
