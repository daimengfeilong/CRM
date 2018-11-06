import { Card,Avatar,Row, Col ,Button,Tag} from 'antd'
import UpdateModal from './UpdateRemarkModal'


const UserTags=({data})=>{

  return data.map((item)=>{

    return (<Tag color="#7070ef"  key={item.classId} style={{marginLeft:'10px'}} >{item.className}</Tag>)

  })

}

const Head=({dispatch,userNo,userInfo,showModel,userTagList,description})=>{

  const updatPorps={
    dispatch,
    description,
    showModel
  }
  const update=()=>{
    dispatch({ type: 'userDetail/save',payload:{showModel:true}});
  }

  return(
    <Card bordered={true} >
      <UpdateModal {...updatPorps}/>
      <Row >
        <Col span={2}>
          <Avatar size={64} icon="user" />
        </Col>
        <Col span={20} style={{height:'64px',display:'flex',alignItems:'center'}}>
          <div >
            <div style={{color:'black',fontSize:'14px',margin:'0px',}}> {userInfo.userName}&nbsp;&nbsp; 身份证号：{userInfo.idCard}
              <UserTags data={userTagList} />
            </div>
            <div style={{color:'black',fontSize:'14px',margin:'0px',}}> 用户编号：{userNo}
            </div>
            <p style={{margin:'0px',fontSize:'12px'}}>备注：{
              (description!==''&&description!==undefined)?description:'无'
            }</p>
          </div>
        </Col>
        <Col span={2}>
          <Button type="primary" onClick={update}>修改备注</Button>
        </Col>
      </Row>

    </Card>
  )
}

export default  Head
