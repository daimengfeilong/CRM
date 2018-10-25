import { Input, Modal, Form, Message, Tree } from 'antd';
import CardTree from './CardTree'

const FormItem = Form.Item;
const TreeNode = Tree.TreeNode
const Search = Input.Search

/**
 * 编辑/新增弹窗
 * zxl 
 * @param {*} props
 * @param {} classItem 单条分类的item对象
 * @returns modal
 * 
 */
const modal = ({ showModel, dispatch, form, classItem }) => {
    const { getFieldDecorator } = form
    const { subClassList } = classItem

    const formItemLayout = {
        labelCol: {
            span: 4,
        },
        wrapperCol: {
            span: 10,
        },
    }

    const cardTreeProps = {
        subClassList,
        dispatch,
        formItemLayout
    }
    
    //更新列表、关闭弹窗
    const saveList = () => {
        dispatch({
            type: 'classify/showModel',
            payload: false
        })

        dispatch({
            type: 'classify/query'
        })
    }

    //关闭弹窗
    const handleCancel = () => {
        dispatch({
            type: 'classify/showModel',
            payload: false
        })

        form.resetFields()
    }

    /**
     * 
     * 提交弹窗表单
     * 通过classId区别编辑/新增
     * @param {} form
     * @param {} classItem
     * 
     */
    const submit = () => {
        form.validateFields(['className'], (err, values) => {
            if (!err) {
                if(classItem.classId){
                    dispatch({
                        type: 'classify/updateClass',
                        payload: classItem
                    }).then(data => {
                        if (data.code == '0000') {
                            saveList()
                        } else {
                            Message.error(data.msg)
                        }
                    })
                }else{
                    dispatch({
                        type: 'classify/addClass',
                        payload: {
                            ...values,
                            subClassList
                        }
                    }).then(data => {
                        if (data.code == '0000') {
                            saveList()
                        } else {
                            Message.error(data.msg)
                        }
                    })
                }
                
            }
        });
    }

    //添加子分类
    const addSubClass = (val) => {
        form.validateFields(['subClassName'], (err, values) => {
            if (!err) {
                dispatch({
                    type: 'classify/addSubClass',
                    payload: {
                        classId: Date.now(),
                        className: val
                    }
                })
            }
        });
    }


    return (
        <Modal
            title={ classItem.classId ? '编辑分类' : '新增分类' }
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
                        initialValue: classItem.className,
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
                <CardTree {...cardTreeProps}></CardTree>
            </Form>
        </Modal>
    )
}

const modalWrap = Form.create()(modal);

export default modalWrap