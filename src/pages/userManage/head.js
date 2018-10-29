import { Input, Row, Col, Modal, Form, Message,  Tree,  Icon, List, Popconfirm, Button, } from 'antd'

const FormItem = Form.Item;

const head =({dispatch,form})=>{

  const {getFieldDecorator} =form

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };
  return(
    <Form>
      <Row>
        <Col span={8}>
          <FormItem {...formItemLayout} label="Nickname">
            {getFieldDecorator('email')(
            <Input placeholder="Please input your nickname" />
            )}
          </FormItem>
        </Col>
        <Col span={8}>
          <FormItem  label="Nickname">
            <Input placeholder="Please input your nickname" />
          </FormItem>
        </Col>
        <Col span={8}>
          <FormItem  label="Nickname">
            <Input placeholder="Please input your nickname" />
          </FormItem>
        </Col>

      </Row>
    </Form>
  )
}

const HeadUserList = Form.create()(head);

export default HeadUserList
