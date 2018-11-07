import {Collapse,Col} from 'antd'
import pic from '../../../assets/default_pic.png'

const Panel = Collapse.Panel;

const initPic=(dispatch,pics)=>{
  pics.idCard=[]
  pics.idCard[0] = pic
  pics.idCard[1] = pic
  pics.bankCard=[]
  pics.bankCard[0] = pic
  pics.bankCard[1] = pic
  pics.user=[]
  pics.user[0] = pic
  pics.user[1] = pic
  pics.creCard=[]
  pics.creCard[0] = pic
  let dftemp = {}
  dftemp.pic = pic
  dftemp.code = ''
  pics.other=[]
  pics.other[0] = dftemp

  dispatch({ type: 'userDetail/save',payload:{pics}});//获取公共用户信息
}

const assembleData=(dispatch,pics,fileList,userNo,idCard)=>{

  let mOther=[]

  for (var i = 0; i < fileList.length; i++) {
    let temp = fileList[i].attType

    const url = '/dfs/bycx-dfs-service/aSysFileAtt/downLoadAtt'
    const params = '?fileType=ATT&attType=' + temp + '&loanNo=' + userNo + '&certNo=' +
      idCard
    switch (temp) {
      case '20800004'://身份证
        //pics.idCard[0] = '/fds/' + this.mList[i].groupId + '/' + this.mList[i].fdsPath
       pics.idCard[0] = url+params
        break
      case '20800005':
       pics.idCard[1] =url+params
        //pics.idCard[1] = '/fds/' + this.mList[i].groupId + '/' + this.mList[i].fdsPath
        break
      case '20800002'://银行
       pics.bankCard[0] =  url+params
        //pics.bankCard[0] = '/fds/' + this.mList[i].groupId + '/' + this.mList[i].fdsPath
        break
      case '20800003':
       pics.bankCard[1]= url+params
        //pics.bankCard[1] = '/fds/' + this.mList[i].groupId + '/' + this.mList[i].fdsPath
        break
      case '20800001'://现场照
        //pics.user[0] = '/fds/' + this.mList[i].groupId + '/' + this.mList[i].fdsPath
       pics.user[0] =  url+params
        break
      case '20800022'://活体识别
        //pics.user[1] = '/fds/' + this.mList[i].groupId + '/' + this.mList[i].fdsPath
       pics.user[1]=url+params
        break
      case '20800019'://信用卡
        //pics.creCard[0] = '/fds/' + this.mList[i].groupId + '/' + this.mList[i].fdsPath
       pics.creCard[0]=url+params
        break
      default:
        let dftemp = {}
        // dftemp.pic = '/fds/' + this.mList[i].groupId + '/' + this.mList[i].fdsPath
        dftemp.pic = url+params
        dftemp.code = temp
        mOther.push(dftemp)
        break
    }
  }
  if (mOther.length != 0) {
   pics.other = mOther
    console.log(mOther.length)
  }
  dispatch({ type: 'userDetail/save',payload:{pics}});
}

const getOther=(data,codes)=>{
 return data.map((item,i)=>{
    return (<Col key={item.code} span={11} offset={getOffset(i)} >
      <img src={item.pic}/>
      <div style={{textAlign:'center',color:'black',padding:'10px'}}>
        {getName(item.code,codes)}
      </div>
    </Col>)
  })
}

function  getName (val,codes) {
  for (let i = 0; i < codes.length; i++) {
    if (val == codes[i].valCode) {
      return codes[i].valName
    }
  }
  console.log('其他信息')
  return '其他信息'
}

function getOffset(val){
  if (val==0){
    return 0
  }else if (val%2==0){
    return 0
  }else {
    return 2
  }

}
const AttachmentPanel =({dispatch,fileList,pics,userNo,idCard,codes})=>{
  console.log(fileList)

  const callback=()=>{

  }
  initPic(dispatch,pics)
  assembleData(dispatch,pics,fileList,userNo,idCard)

  return(
    <Collapse defaultActiveKey={['1','2','3','4','5']} onChange={callback}>
      <Panel header="身份证" key="1">
        <Col span={11} >
          <img src={pics.idCard[0]}/>
          <div style={{textAlign:'center',color:'black',padding:'10px'}}>
            身份证正面
          </div>
        </Col>
        <Col span={11} offset={2}>
          <img src={pics.idCard[1]}/>
          <div style={{textAlign:'center',color:'black',padding:'10px'}}>
            身份证背面
          </div>
        </Col>
      </Panel>
      <Panel header="银行卡" key="2">
        <Col span={11} >
          <img src={pics.bankCard[0]}/>
          <div style={{textAlign:'center',color:'black',padding:'10px'}}>
            银行卡正面
          </div>
        </Col>
        <Col span={11} offset={2}>
          <img src={pics.bankCard[1]}/>
          <div style={{textAlign:'center',color:'black',padding:'10px'}}>
            银行卡背面
          </div>
        </Col>
      </Panel>
      <Panel header="用户本人照" key="3" >
        <Col span={11} >
          <img src={pics.user[0]}/>
          <div style={{textAlign:'center',color:'black',padding:'10px'}}>
            现场照
          </div>
        </Col>
        <Col span={11} offset={2}>
          <img src={pics.user[1]}/>
          <div style={{textAlign:'center',color:'black',padding:'10px'}}>
            人脸识别活体图片
          </div>
        </Col>
      </Panel>
      <Panel header="信用卡" key="4" >
        <Col span={11} >
          <img src={pics.creCard[0]}/>
          <div style={{textAlign:'center',color:'black',padding:'10px'}}>
            信用卡
          </div>
        </Col>
        <Col span={11} offset={2}>
        </Col>
      </Panel>
      <Panel header="其他信息" key="5" >
        {getOther(pics.other,codes)}
      </Panel>
    </Collapse>
  )
}

export default AttachmentPanel
