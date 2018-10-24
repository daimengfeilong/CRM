import { Row, Col, Input, Button, Modal, Form, Select } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const {TextArea} = Input

const modal = ({ showModel, dispatch, form }) => {
    const { getFieldDecorator } = form

    const handleCancel = () => {
        dispatch({
            type: 'tags/showModel',
            payload: false
        })
    }

    return (
        <Modal
            title="新增标签"
            width="40%"
            okText="保存"
            cancelText="取消"
            visible={showModel}
            onCancel={handleCancel}
        >
            <Form>
                <Row>
                    <Col span={12}>
                        <FormItem label="标签名称" labelCol={{span: 5}} wrapperCol={{span:18}}>
                            {getFieldDecorator('tagName', {
                                rules: [{ required: true, message: '请输入标签名称' }],
                            })(
                                <Input placeholder="请输入标签名称" />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem label="标签类别" labelCol={{span: 5,offset:2}} wrapperCol={{span:17}}>
                            {getFieldDecorator('classId', {
                                rules: [{ required: true, message: '请输入标签类别' }],
                            })(
                                <Input placeholder="请输入标签类别" />
                            )}
                        </FormItem>
                    </Col>
                    </Row>
                    <FormItem label="标签说明">
                        {getFieldDecorator('description', {
                            rules: [{ required: true, message: '请输入标签说明' }],
                        })(
                            <TextArea placeholder="请输入标签说明" rows={2} />
                        )}
                    </FormItem>
            </Form>
        </Modal>
    )
}

const modalWrap = Form.create()(modal);

export default modalWrap