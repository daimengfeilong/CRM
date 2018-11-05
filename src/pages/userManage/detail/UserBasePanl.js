import { Card,Col ,Divider} from 'antd'

const UserBasePanl = ({ dispatch,userBaseInfo})=>{


  return(
    <>
      <Card>
        <Col span={4}>
          姓名：{userBaseInfo.userName}
        </Col>
        <Col span={6}>
          证件号：{userBaseInfo.idCard}
        </Col>
        <Col span={4}>
          性别：{userBaseInfo.sex}
        </Col>
        <Col span={10}>
          注册时间：{userBaseInfo.regTime}
        </Col>


        <Col span={4} className="manageTop">
          年龄：{userBaseInfo.age}
        </Col>
        <Col span={6} className="manageTop">
          职业：{userBaseInfo.work}
        </Col>
        <Col span={14} className="manageTop">
          *来源：{userBaseInfo.dataSource}
        </Col>
      </Card>

      <Card className="manageTop">
        <div style={{paddingTop:'16px',paddingBottom:'16px'}}>
          <Col span={4} >
            证件类型：身份证{userBaseInfo.certType}
          </Col>
          <Col span={6} >
            证件号码：{userBaseInfo.certNo}
          </Col>
          <Col span={4}>
            发证机构：{userBaseInfo.signOrg}
          </Col>
          <Col span={10} >
            证件签发日期：{userBaseInfo.certSignDate}
          </Col>
        </div>
        <Divider dashed/>
        <div>
          <Col span={6} >
            户籍所在省：{userBaseInfo.province}
          </Col>
          <Col span={6} >
            户籍所在市：{userBaseInfo.city}
          </Col>
          <Col span={12} >
            户籍所在区/县：{userBaseInfo.region}
          </Col>
        </div>
          <Col span={24} className="manageTop">
            详细地址：{userBaseInfo.homeAddress}
          </Col>

      </Card>

    <Card className="manageTop">
      <div style={{paddingTop:'16px',paddingBottom:'16px'}}>
        <Col span={6} >
          居住地所在省/直辖市：{userBaseInfo.residentProvince}
        </Col>
        <Col span={6} >
          居住地所在市：{userBaseInfo.residentCity}
        </Col>
        <Col span={12} >
          居住地所在区/县：{userBaseInfo.residentRegion}
        </Col>
      </div>
      <Divider  dashed/>
      <Col span={24} >
        居住地详细地址：{userBaseInfo.residentDetailAddress}
      </Col>
    </Card>


      <Card className="manageTop">
        <div style={{paddingTop:'16px',paddingBottom:'16px'}}>
          <Col span={6} >
            工作单位所在省：{userBaseInfo.workProvince}
          </Col>
          <Col span={6} >
            工作单位所在市：{userBaseInfo.workCity}
          </Col>
          <Col span={12} >
            工作单位所在区/县：{userBaseInfo.workRegion}
          </Col>
        </div>
        <Divider dashed />
        <div >
          <Col span={4} >
            个人收入：{userBaseInfo.personIncome}
          </Col>
          <Col span={6} >
            收入来源：{userBaseInfo.incomeSource}
          </Col>
          <Col span={14} >
            是否有其他贷款：{userBaseInfo.isOtherLoan}
          </Col>
        </div>
        <Col span={24} className="manageTop">
          工作单位详细地址：{userBaseInfo.workDetailAddress}
        </Col>
      </Card>
    </>
  )
}


export default  UserBasePanl
