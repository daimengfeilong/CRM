import { Row, Col, Input, Button, Modal, Form, Message,Tree,Icon,Tag,Select   } from 'antd';


const FormItem = Form.Item;
const TreeNode = Tree.TreeNode
const Search = Input.Search
const Option= Select.Option
const { TextArea } = Input;

const modal = ({ showModel, dispatch, form,subClass,classItem,classList }) => {




    const { getFieldDecorator } = form
    const { subClassList } = classItem
    let selectedKey = []


    const formItemLayout = {
        labelCol: {
            span: 4,
        },
        wrapperCol: {
            span: 17,
            offset:1
        },
    }


  const children = [];
  for (let i = 0; i < classList.length; i++) {
    children.push(<Option key={classList[i].classId}>{classList[i].className}</Option>);
  }

  const showSelectTags = () =>{
    dispatch({
      type:'portrait/save',
      payload:{
        classItem:{}
      }
    })

    dispatch({
      type:'portrait/showTagModel',
      payload:true
    })
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
  const  handleChange =(value)=> {
    console.log(`selected ${value}`);
  }


    return (
        <Modal
            title="新增画像"
            width="60%"
            okText="保存"
            cancelText="取消"
            visible={showModel}
            onCancel={handleCancel}
            onOk={submit}
        >

            <Form>

              <Row gutter={24}>
                <Col span={12}>
                  <FormItem {...formItemLayout} label="画像名称：">
                    {getFieldDecorator('Name')(
                      <Input placeholder="请输入" />
                    )}
                  </FormItem>
                </Col>
                <Col span={12} >
                  <FormItem {...formItemLayout}  label="画像分类：">
                    <Select
                      showSearch
                      style={{ width: 200 }}
                      placeholder="请选择画像分类"
                      optionFilterProp="children"
                      onChange={handleChange}
                      filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                      {children}
                  </Select>
                  </FormItem>
                </Col>
              </Row>
                <span>包含标签：</span>
              <Button type="primary" shape="circle" icon="plus"  style={{width:'24px',height:'24px'}} onClick={showSelectTags}/>
              <div style={{minHeight:'100px',padding:'10px'}}>
                <Row type="flex" justify="space-between">
                  <Col span={4}>
                    <Tag color="blue" closable >blue</Tag></Col>
                  <Col span={4}><Tag color="blue" closable >blue</Tag></Col>
                  <Col span={4}><Tag color="blue" closable>blue</Tag></Col>
                  <Col span={4}><Tag color="blue" closable >blue</Tag></Col>
                </Row>
              </div>

                <FormItem label="画像描述（规则、用途等）："  >
                    {getFieldDecorator('subClassName', {
                        rules: [
                            { pattern: /^([0-9\u4e00-\u9fa5]{1,6})$/, message: '请输入1-6个中文或者数字字符' }
                        ],
                    })(
                      <TextArea rows={4} />
                    )}
                </FormItem>
            </Form>
        </Modal>
    )
}

const modalWrap = Form.create()(modal);

export default modalWrap
