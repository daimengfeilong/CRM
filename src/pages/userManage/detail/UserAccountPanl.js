import { Card,Col,Divider } from 'antd'

const UserAccountPanl = ({accountInfo}) =>{

  return(
    <>
    <Card>
      <div style={{paddingTop:'16px',paddingBottom:'16px'}}>
        <Col span={8} >
          银行卡号：{accountInfo.bankCardNo}
        </Col>
        <Col span={16} >
          持卡人：{accountInfo.cardholder}
        </Col>
      </div>
      <Divider dashed />
        <Col span={8} >
          开户机构：{accountInfo.openAccBank}
        </Col>
        <Col span={16} >
          银行预留手机号：{accountInfo.reservedPhoneNo}
        </Col>
      <div style={{paddingTop:'16px',paddingBottom:'16px'}}>
        <Col span={8} className="manageTop">
          开户机构所在省：{accountInfo.openAccOrgProvince}
        </Col>
        <Col span={6} className="manageTop">
          开户机构所在市：{accountInfo.openAccOrgCity}
        </Col>
        <Col span={10} className="manageTop">
          开户机构所在区县：{accountInfo.openAccOrgRegion}
        </Col>
      </div>
      <Col span={24} className="manageTop">
        开户支行所在地：{accountInfo.openAccBankLocation}
      </Col>

    </Card>
    </>
  )

}

export default UserAccountPanl
