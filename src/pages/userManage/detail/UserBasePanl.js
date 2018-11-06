import { Card,Col ,Row} from 'antd'

const UserBasePanl = ({ dispatch,userBaseInfo})=>{


  return(
    <>
      <Card style={{lineHeight:'2'}}>
        <Row type="flex" justify="space-around">
          <Col span={6}>姓名：{userBaseInfo.userName}</Col>
          <Col span={6}>生日：{userBaseInfo.birthday}</Col>
          <Col span={6}>年龄：{userBaseInfo.age}</Col>
        </Row>
        <Row type="flex"  justify="space-around">
          <Col span={6}>性别：{userBaseInfo.sex}</Col>
          <Col span={6}>学历：{userBaseInfo.education}</Col>
          <Col span={6}>注册时间：{userBaseInfo.regTime}</Col>
        </Row>
        <Row type="flex"  justify="space-around">
          <Col span={6}>数据来源：{userBaseInfo.dataSource}</Col>
          <Col span={6}>联系电话：{userBaseInfo.phone}</Col>
          <Col span={6}>&nbsp;</Col>
        </Row>

        <Row type="flex" className="manageTop"  justify="space-around">
          <Col span={6}>证件类型：{userBaseInfo.certType}</Col>
          <Col span={6}>电子邮箱：{userBaseInfo.email}</Col>
          <Col span={6}>&nbsp;</Col>
        </Row>
        <Row type="flex"   justify="space-around">
          <Col span={6}>证件号：{userBaseInfo.certNo}</Col>
          <Col span={6}>发证机构：{userBaseInfo.signOrg}</Col>
          {/*<Col span={6}>居住地址：{userBaseInfo.residentDetailAddress}</Col>*/}
          <Col span={6}>&nbsp;</Col>
        </Row>
        <Row type="flex"  justify="space-around" >
          <Col span={6}>证件有效期：{userBaseInfo.certExpire}</Col>
          <Col span={6}>证件签发日期：{userBaseInfo.certSignDate}</Col>
          {/*<Col span={6}>联系地址：{userBaseInfo.commonContact}</Col>*/}
          <Col span={6}>&nbsp;</Col>
        </Row>
        <Row type="flex"  justify="space-around">
          <Col span={6}>户籍所在省：{userBaseInfo.province}</Col>
          <Col span={6}>户籍所在市：{userBaseInfo.city}</Col>
          {/*<Col span={6}>联系电话：{userBaseInfo.phone}</Col>*/}
          {/*<Col span={6}>家庭地址：{userBaseInfo.homeAddress}</Col>*/}
          <Col span={6}>&nbsp;</Col>
        </Row>
        <Row type="flex"  justify="space-around">
          <Col span={6}>户籍所在区县：{userBaseInfo.region}</Col>
          <Col span={6}>详细地址：{userBaseInfo.homeAddress}</Col>
          {/*<Col span={6}>微信号：{userBaseInfo.weixin}</Col>*/}
          {/*<Col span={6}>办公地址：{userBaseInfo.workDetailAddress}</Col>*/}
          <Col span={6}>&nbsp;</Col>
        </Row>
        <Row type="flex"  justify="space-around">
          <Col span={6}>居住地所在省/直辖市：{userBaseInfo.residentProvince}</Col>
          <Col span={6}>居住地所在市：{userBaseInfo.residentCity}</Col>
          {/*<Col span={6}>职业：{userBaseInfo.work}</Col>*/}
          {/*<Col span={6}>常用联系地址地址：{userBaseInfo.contactAddress}</Col>*/}
          <Col span={6}>&nbsp;</Col>
        </Row>
        <Row type="flex"  justify="space-around">
          <Col span={6}>居住地所在区/县：{userBaseInfo.residentRegion}</Col>
          <Col span={6}>居住地详细地址：{userBaseInfo.residentDetailAddress}</Col>
          {/*<Col span={6}>数据来源：{userBaseInfo.dataSource}</Col>*/}
          {/*<Col span={6}>投保职业等级：{userBaseInfo.insureWorkLevel}</Col>*/}
          <Col span={6}>&nbsp;</Col>
        </Row>
        <Row type="flex"  justify="space-around">
          <Col span={6}>工作所在省/直辖市：{userBaseInfo.workProvince}</Col>
          <Col span={6}>工作所在市：{userBaseInfo.workCity}</Col>
          <Col span={6}>&nbsp;</Col>
        </Row>
        <Row type="flex"  justify="space-around">
          <Col span={6}>工作所在区/县：{userBaseInfo.workRegion}</Col>
          <Col span={6}>工作详细地址：{userBaseInfo.workDetailAddress}</Col>
          <Col span={6}>&nbsp;</Col>
        </Row>
        <Row type="flex" justify="space-around" >
          <Col span={6}>个人收入：{userBaseInfo.personIncome}</Col>
          <Col span={6}>收入来源：{userBaseInfo.incomeSource}</Col>
          <Col span={6}>&nbsp;</Col>
        </Row>
        <Row type="flex"  justify="space-around">
          <Col span={6}>邮编：{userBaseInfo.yearSalary}</Col>
          <Col span={6}>是否有其他贷款：{userBaseInfo.isOtherLoan}</Col>
          <Col span={6}>&nbsp;</Col>
        </Row>
      </Card>
    </>
  )
}


export default  UserBasePanl
