import { Input, Row, Col, Form,  Button, } from 'antd'

const FormItem = Form.Item;

const head =({dispatch,form})=>{

  const { getFieldDecorator, getFieldsValue, resetFields } =form

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

  const queryUser = () => {
    const values = getFieldsValue()
    dispatch({
      type: "userList/query",
      payload: {
        params: {
          userNo: values.userNo,
          idCard: values.idCard,
        }
      }
    })
  }

  const resetForm = () => {
    resetFields()
  }

  return(
    <Form>
      <Row gutter={24}>
        <Col span={8}>
          <FormItem {...formItemLayout} label="用户编号">
            {getFieldDecorator('userNo', {
              initialValue: ""
            })(
            <Input placeholder="请输入" />
            )}
          </FormItem>
        </Col>
        <Col span={8} >
          <FormItem {...formItemLayout}  label="证件号码">
            {getFieldDecorator('idCard', {
              initialValue: ""
            })(
              <Input placeholder="请输入" />
            )}
          </FormItem>
        </Col>
        <Col span={6} offset={2}>
          <div style={{textAlign:'right'}}>
          <Button type="primary" onClick={queryUser}>查询</Button>
          <Button style={{marginLeft:'10px'}} onClick={resetForm}>重置</Button>
          </div>
        </Col>
      </Row>
    </Form>
  )
}

const HeadUserList = Form.create()(head);

export default HeadUserList
