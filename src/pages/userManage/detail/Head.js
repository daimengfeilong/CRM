import { Card,Avatar,Row, Col ,Button} from 'antd'

const Head=({dispatch,userNo})=>{


  return(
    <Card bordered={true} >
      <Row >
        <Col span={2}>
          <Avatar size={64} icon="user" />
        </Col>
        <Col span={20} style={{height:'64px',display:'flex',alignItems:'center'}}>
          <div >
            <p style={{color:'black',fontSize:'16px',margin:'0px',}}>用户编号：{userNo}</p>
            <p style={{margin:'0px'}}>备注：11111111111</p>
          </div>
        </Col>
        <Col span={2}>
          <Button type="primary">修改备注</Button>
        </Col>
      </Row>

    </Card>
  )
}

export default  Head
