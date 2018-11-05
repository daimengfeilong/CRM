import { Row,Col,Card,Table } from 'antd'

const UserAccountInsurePanel =({accountInfo})=>{

  return(
    <Card title="银行账户信息">
      <p>保险代扣缴费卡</p>
      <Row type="flex">
        <Col span={6}>开户银行：{accountInfo.openAccBank}</Col>
        <Col span={6}>银行账号：{accountInfo.bankCardNo}</Col>
        <Col span={6}>持卡人：{accountInfo.cardholder}</Col>
      </Row>
      <Row type="flex" className="manageTop">
        <Col span={6}>银行地址：{accountInfo.openAccOrgProvince}-{accountInfo.openAccOrgCity}</Col>
        <Col span={6}>开户支行：{accountInfo.openAccOrg}</Col>
      </Row>
    </Card>
  )

}

export default UserAccountInsurePanel
