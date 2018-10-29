import { Row, Col, Input, Button, Modal, Form, Message,Tree } from 'antd';

const FormItem = Form.Item;
const TreeNode = Tree.TreeNode
const Search = Input.Search

const modal = ({ showModel, dispatch, form,subClass,classItem }) => {




      const { getFieldDecorator } = form
    const { subClassList } = classItem
    let selectedKey = []

    const formItemLayout = {
        labelCol: {
            span: 4,
        },
        wrapperCol: {
            span: 10,
        },
    }


    const handleCancel = () => {
        dispatch({
            type: 'portrait/showModel',
            payload: false
        })

        form.resetFields()
    }

    const submit = () =>{
        form.validateFields(['className'],(err, values) => {
            if (!err) {
                const subClassArr = [subClass.map(item => item.className)]

                dispatch({
                    type: 'portrait/addClass',
                    payload: {
                        ...values,
                        subClassName:subClassArr.join(',')
                    }
                }).then(data => {
                    if(data.code == '0000'){
                        dispatch({
                            type: 'portrait/showModel',
                            payload: false
                        })
                    }else{
                        Message.error(data.msg)
                    }
                })
            }
        });
    }

    const addSubClass = (val) =>{
        form.validateFields(['subClassName'],(err, values) => {
            if (!err) {
                dispatch({
                    type:'portrait/addSubClass',
                    payload:{
                        classId:Date.now(),
                        className:val
                    }
                })
            }
        });
    }

    const delSubClass = () => {
        if(!selectedKey.length) return false;

        dispatch({
            type:'portrait/delSubClass',
            payload:{
                classId:selectedKey[0]
            }
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
            onOk={submit}
        >
            <Form>
                <FormItem label="分类名称" {...formItemLayout} >
                    {getFieldDecorator('className', {
                        initialValue:classItem.className,
                        rules: [
                            { required: true, message: '请输入分类名称' },
                            { pattern: /^([\u4e00-\u9fa5]{1,6})$/, message: '请输入1-6个中文字符' }
                        ],
                    })(
                        <Input placeholder="请输入标签名称" />
                    )}
                </FormItem>
                <FormItem label="添加子分类" {...formItemLayout} >
                    {getFieldDecorator('subClassName', {
                        rules: [
                            { required: true, message: '请输入子分类名称' },
                            { pattern: /^([0-9\u4e00-\u9fa5]{1,6})$/, message: '请输入1-6个中文或者数字字符' }
                        ],
                    })(
                        <Search
                            placeholder="请输入子分类名称"
                            enterButton="添加"
                            onSearch={addSubClass}
                        />
                    )}
                </FormItem>
                <Row>
                    <Col span={12} style={{border:'2px solid #f5f5f5'}}>
                        <Tree
                            onSelect={selected => selectedKey = selected}
                        >
                            {
                                subClassList && subClassList.map((item,index) => (
                                    <TreeNode title={item.className} key={item.classId} />
                                ))
                            }
                        </Tree>
                    </Col>
                    <Col span="12">
                        <Button type="primary" icon="delete" onClick={delSubClass}>移除</Button>
                    </Col>
                </Row>
            </Form>
        </Modal>
    )
}

const modalWrap = Form.create()(modal);

export default modalWrap
