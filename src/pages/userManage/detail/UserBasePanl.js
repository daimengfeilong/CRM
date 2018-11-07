import { Card,Col ,Row} from 'antd'

const UserBasePanl = ({ dispatch,userBaseInfo})=>{


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
        <Row type="flex"  justify="space-around">
          <Col span={6}>数据来源：{filterData(userBaseInfo.dataSource)}</Col>
          <Col span={6}>联系电话：{filterData(userBaseInfo.phone)}</Col>
          <Col span={6}>&nbsp;</Col>
        </Row>

        <Row type="flex" className="manageTop"  justify="space-around">
          <Col span={6}>证件类型：{filterData(userBaseInfo.certType)}</Col>
          <Col span={6}>电子邮箱：{filterData(userBaseInfo.email)}</Col>
          <Col span={6}>&nbsp;</Col>
        </Row>
        <Row type="flex"   justify="space-around">
          <Col span={6}>证件号：{filterData(userBaseInfo.certNo)}</Col>
          <Col span={6}>发证机构：{filterData(userBaseInfo.signOrg)}</Col>
          {/*<Col span={6}>居住地址：{filterData(userBaseInfo.residentDetailAddress}</Col>*/}
          <Col span={6}>&nbsp;</Col>
        </Row>
        <Row type="flex"  justify="space-around" >
          <Col span={6}>证件有效期：{filterData(userBaseInfo.certExpire)}</Col>
          <Col span={6}>证件签发日期：{filterData(userBaseInfo.certSignDate)}</Col>
          {/*<Col span={6}>联系地址：{filterData(userBaseInfo.commonContact}</Col>*/}
          <Col span={6}>&nbsp;</Col>
        </Row>
        <Row type="flex"  justify="space-around">
          <Col span={6}>户籍所在省：{filterData(userBaseInfo.province)}</Col>
          <Col span={6}>户籍所在市：{filterData(userBaseInfo.city)}</Col>
          {/*<Col span={6}>联系电话：{filterData(userBaseInfo.phone}</Col>*/}
          {/*<Col span={6}>家庭地址：{filterData(userBaseInfo.homeAddress}</Col>*/}
          <Col span={6}>&nbsp;</Col>
        </Row>
        <Row type="flex"  justify="space-around">
          <Col span={6}>户籍所在区县：{filterData(userBaseInfo.region)}</Col>
          <Col span={6}>详细地址：{filterData(userBaseInfo.homeAddress)}</Col>
          {/*<Col span={6}>微信号：{filterData(userBaseInfo.weixin}</Col>*/}
          {/*<Col span={6}>办公地址：{filterData(userBaseInfo.workDetailAddress}</Col>*/}
          <Col span={6}>&nbsp;</Col>
        </Row>
        <Row type="flex"  justify="space-around">
          <Col span={6}>居住地所在省/直辖市：{filterData(userBaseInfo.residentProvince)}</Col>
          <Col span={6}>居住地所在市：{filterData(userBaseInfo.residentCity)}</Col>
          {/*<Col span={6}>职业：{filterData(userBaseInfo.work}</Col>*/}
          {/*<Col span={6}>常用联系地址地址：{filterData(userBaseInfo.contactAddress}</Col>*/}
          <Col span={6}>&nbsp;</Col>
        </Row>
        <Row type="flex"  justify="space-around">
          <Col span={6}>居住地所在区/县：{filterData(userBaseInfo.residentRegion)}</Col>
          <Col span={6}>居住地详细地址：{filterData(userBaseInfo.residentDetailAddress)}</Col>
          {/*<Col span={6}>数据来源：{filterData(userBaseInfo.dataSource}</Col>*/}
          {/*<Col span={6}>投保职业等级：{filterData(userBaseInfo.insureWorkLevel}</Col>*/}
          <Col span={6}>&nbsp;</Col>
        </Row>
        <Row type="flex"  justify="space-around">
          <Col span={6}>工作所在省/直辖市：{filterData(userBaseInfo.workProvince)}</Col>
          <Col span={6}>工作所在市：{filterData(userBaseInfo.workCity)}</Col>
          <Col span={6}>&nbsp;</Col>
        </Row>
        <Row type="flex"  justify="space-around">
          <Col span={6}>工作所在区/县：{filterData(userBaseInfo.workRegion)}</Col>
          <Col span={6}>工作详细地址：{filterData(userBaseInfo.workDetailAddress)}</Col>
          <Col span={6}>&nbsp;</Col>
        </Row>
        <Row type="flex" justify="space-around" >
          <Col span={6}>个人收入：{filterData(userBaseInfo.personIncome)}</Col>
          <Col span={6}>收入来源：{filterData(userBaseInfo.incomeSource)}</Col>
          <Col span={6}>&nbsp;</Col>
        </Row>
        <Row type="flex"  justify="space-around">
          <Col span={6}>邮编：{filterData(userBaseInfo.yearSalary)}</Col>
          <Col span={6}>是否有其他贷款：{filterData(userBaseInfo.isOtherLoan)}</Col>
          <Col span={6}>&nbsp;</Col>
        </Row>
      </Card>
    </>
  )
}


export default  UserBasePanl
