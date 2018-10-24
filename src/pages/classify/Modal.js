import { Row, Col, Input, Button, Modal, Form, Select,Tree } from 'antd';

const FormItem = Form.Item;
const TreeNode = Tree.TreeNode
const Search = Input.Search

const modal = ({ showModel, dispatch, form,subClass }) => {
    const { getFieldDecorator } = form

    const formItemLayout = {
        labelCol: {
            span: 4,
        },
        wrapperCol: {
            span: 10,
        },
    }
    
    let delKey = []

    const handleCancel = () => {
        dispatch({
            type: 'classify/showModel',
            payload: false
        })
    }

    const submit = () =>{
        form.validateFields((err, values) => {
            if (!err) {
                console.log(values);
            }
        });
    }

    const addSubClass = (val) =>{
        dispatch({
            type:'classify/addSubClass',
            payload:{
                classId:Date.now(),
                className:val
            }
        })
    }

    const delSubClass = () => {
        if(!delKey.length) return false;

        dispatch({
            type:'classify/delSubClass',
            payload:{
                classId:delKey[0]
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
                        rules: [{ required: true, message: '请输入分类名称' }],
                    })(
                        <Input placeholder="请输入标签名称" />
                    )}
                </FormItem>
                <FormItem label="添加子分类" {...formItemLayout} >
                    {getFieldDecorator('subClassName', {
                        rules: [{ required: true, message: '请输入子分类名称' }],
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
                            onSelect={selectedKeys => delKey = selectedKeys}
                        >  
                            {
                                subClass.map((item,index) => (
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