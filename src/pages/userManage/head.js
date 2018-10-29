import { Input, Row, Col, Form, Message,  Button, } from 'antd'

const FormItem = Form.Item;

const head =({dispatch,form})=>{

  const {getFieldDecorator} =form

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 5 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 19 },
    },
  };
  return(
    <Form>
      <Row gutter={24}>
        <Col span={8}>
          <FormItem {...formItemLayout} label="用户编号：">
            {getFieldDecorator('email')(
            <Input placeholder="请输入" />
            )}
          </FormItem>
        </Col>
        <Col span={8} >
          <FormItem {...formItemLayout}  label="证件号码：">
            <Input placeholder="请输入" />
          </FormItem>
        </Col>
        <Col span={6} offset={2}>
          <div style={{textAlign:'right'}}>
          <Button type="primary">查询</Button>
          <Button style={{marginLeft:'10px'}}>重置</Button>
          </div>
        </Col>
      </Row>
    </Form>
  )
}

const HeadUserList = Form.create()(head);

export default HeadUserList
