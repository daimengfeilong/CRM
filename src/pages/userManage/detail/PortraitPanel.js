import { Carousel, Card, Row, Col, Button,Tag  } from 'antd'
import './port.less'
import React from 'react'
import { timestampToDate } from '../../../utils/utils'




const ShowTags=({data})=> {
  return data.map((item) => {
    return (<Tag color="#7070ef"  key={item.tagId} >{item.tagName}</Tag>)
  });
}


class PortraitPanel extends React.Component{


  constructor(props) {
    super(props);

    this.carouselRef = null;

    this.setCarouselRef = el => {
      this.carouselRef = el;
    };
  }

  componentDidMount(){
    const { userPortraitList,dispatch }  =this.props.tabProps
    if (userPortraitList.length===0){
      const temp={
        portraitId:'01c9d7dcdcc24bd799dc2352925e9b121zds',
        portraitName:'数据测试22'
      }
      userPortraitList.push(temp)
    }else {

    }

    if (userPortraitList.length !== 0){
      const portraitId=userPortraitList[0].portraitId
      dispatch({type:'userDetail/queryPortraitId',payload:portraitId})
    }

  }




  render() {

  const { userPortraitList,portraitItem,dispatch }  =this.props.tabProps

      if (userPortraitList.length===0){
      const temp={
        portraitId:'01c9d7dcdcc24bd799dc2352925e9b121zds',
        portraitName:'数据测试22',
        isSelected:true
      }
      const temp1={
        portraitId:'98b17449efd74b319e9926e3483d5aa25wk3',
        portraitName:'数据测试2cc'
      }


        const temp3={
          portraitId:'222',
          portraitName:'数据测试2c3c'
        }

        const temp4={
          portraitId:'2222',
          portraitName:'数据测试2c3c'
        }
      userPortraitList.push(temp)
      userPortraitList.push(temp1)
        userPortraitList.push(temp3)
        userPortraitList.push(temp4)
    }


    const loop = data => data.map((item)=>{
        return (
          <div key ={item.portraitId} >
            {show(item)}
          </div>
        )
      })


    const show=(item)=>{
        if (item.isSelected!==undefined&&item.isSelected) {
          return   <div className="portrait2" ><h3>{item.portraitName}</h3></div>
         }
          else{
          return <div className="portrait"><h3>{item.portraitName}</h3></div>
        }
    }

    function onChange (a) {
    console.log(a)
      userPortraitList.map((item)=>{
        if (userPortraitList[a].portraitId===item.portraitId){
          item.isSelected=true
        } else {
          item.isSelected=false
        }

      })


      const portraitId=userPortraitList[a].portraitId
      dispatch({type:'userDetail/queryPortraitId',payload:portraitId})
    }

    const prev = () => {
      // 调用
      if (this.carouselRef) this.carouselRef.prev();
    }

    const next = () => {
      // 调用
      if (this.carouselRef) this.carouselRef.next();
    }

    const settings = {
      dots: false,
      focusOnSelect: true,
      slidesToShow: 3,
      infinite: true,
      slidesToScroll: 1,
      speed: 500,
    }
    return (
      <>
        <Row>
          <Col span={2}>
            <div className="portrait_arrow">
              <Button type="primary" shape="circle" icon="left" onClick={prev}/>
            </div>
          </Col>
          <Col span={20}>
            <Carousel ref={this.setCarouselRef} afterChange={onChange} {...settings} className="portrait_show" >
              {loop(userPortraitList)}
            </Carousel>
          </Col>
          <Col span={2}>
            <div className="portrait_arrow">
              <Button type="primary" shape="circle" icon="right" onClick={next}/>
            </div>
          </Col>
        </Row>


        <Card title="画像说明" style={{marginTop:'16px'}}>
          <div className="user_portrait_content">
            <div>
              修改时间： {(portraitItem.instDate!==undefined)?timestampToDate(portraitItem.instDate):'无'}
            </div>

            <div>
              画像包含用户：{(portraitItem.personNum)?portraitItem.personNum+'人':portraitItem.personNum}
            </div>

            <div>
              画像规则：{(portraitItem.tagList)?(<ShowTags data={portraitItem.tagList}/>):''}
            </div>

            <div>
              画像解释：{portraitItem.description}
            </div>
          </div>
        </Card>
      </>
    )
  }
}

export default PortraitPanel
