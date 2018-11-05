import { Carousel, Card, Row, Col, Button } from 'antd'
import './port.less'
import React from 'react'

class PortraitPanel extends React.Component{


  constructor(props) {
    super(props);

    this.carouselRef = null;

    this.setCarouselRef = el => {
      this.carouselRef = el;
    };
  }

  render() {

  const { userPortraitList }  =this.props

    console.log(this.props)

    function onChange (a) {
      console.log(a)
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
      infinite: true,
      slidesToShow: 3,
      arrows: true,
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
            <Carousel ref={this.setCarouselRef} afterChange={onChange} {...settings} >

              <div>
                <div style={{
                  background: '#364d79',
                  marginLeft: '2px',
                  marginRight: '2px',
                }}>
                  <h3>1</h3>
                </div>
              </div>
              <div>
                <div style={{
                  background: '#364d79',
                  marginLeft: '2px',
                  marginRight: '2px',
                }}>
                  <h3>2</h3>
                </div>
              </div>
              <div>
                <div style={{
                  background: '#364d79',
                  marginLeft: '2px',
                  marginRight: '2px',
                }}>
                  <h3>3</h3>
                </div>
              </div>
              <div>
                <div style={{
                  background: '#364d79',
                  marginLeft: '2px',
                  marginRight: '2px',
                }}>
                  <h3>4</h3>
                </div>
              </div>
              <div>
                <div style={{
                  background: '#364d79',
                  marginLeft: '2px',
                  marginRight: '2px',
                }}>
                  <h3>5</h3>
                </div>
              </div>
              <div>
                <div style={{
                  background: '#364d79',
                  marginLeft: '2px',
                  marginRight: '2px',
                }}>
                  <h3>6</h3>
                </div>
              </div>
              <div>
                <div style={{
                  background: '#364d79',
                  marginLeft: '2px',
                  marginRight: '2px',
                }}>
                  <h3>7</h3>
                </div>
              </div>
              <div>
                <div style={{
                  background: '#364d79',
                  marginLeft: '2px',
                  marginRight: '2px',
                }}>
                  <h3>8</h3>
                </div>
              </div>
              <div>
                <div style={{
                  background: '#364d79',
                  marginLeft: '2px',
                  marginRight: '2px',
                }}>
                  <h3>9</h3>
                </div>
              </div>
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
            <p>
              修改时间：
            </p>

            <p>
              画像包含用户：
            </p>

            <p>
              画像规则：
            </p>

            <p>
              画像解释：
            </p>
          </div>
        </Card>
      </>
    )
  }
}

export default PortraitPanel
