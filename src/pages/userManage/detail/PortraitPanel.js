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

  loops = data => data.map((item)=>{
    return (
      <div key ={item.portraitId} >
        {this.show(item)}
      </div>
    )
  })
  show=(item)=>{
    if (item.isSelected!==undefined&&item.isSelected) {
      return   <div className="portrait2" ><h3>{item.portraitName}</h3></div>
    }
    else{
      return <div className="portrait"><h3>{item.portraitName}</h3></div>
    }
  }
  onChange=(a)=> {
    const { userPortraitList,dispatch }  =this.props.tabProps
    userPortraitList.map((item)=>{
      if (userPortraitList[a].portraitId===item.portraitId){
        item.isSelected=true
      } else {
        item.isSelected=false
      }
    })
    if (userPortraitList.length!==0){
      const portraitId=userPortraitList[a].portraitId
      dispatch({type:'userDetail/queryPortraitId',payload:portraitId})
      const index=a
      dispatch({type:'userDetail/save',payload:index})
    }
  }
  prev = () => {
    // 调用
    if (this.carouselRef) this.carouselRef.prev();
  }
  next = () => {
    // 调用
    if (this.carouselRef) this.carouselRef.next();
  }

  render() {
  const { userPortraitList,portraitItem }  =this.props.tabProps

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
              <Button type="primary" shape="circle" icon="left" onClick={this.prev}/>
            </div>
          </Col>
          <Col span={20}>
            <Carousel ref={this.setCarouselRef} afterChange={this.onChange} {...settings} className="portrait_show" >
              {this.loops(userPortraitList)}
            </Carousel>
          </Col>
          <Col span={2}>
            <div className="portrait_arrow">
              <Button type="primary" shape="circle" icon="right" onClick={this.next}/>
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
