import { Row, Col, Input, Button, Modal, Form, Message,Tree,Icon,Tag,Select   } from 'antd';


const FormItem = Form.Item;
const TreeNode = Tree.TreeNode
const Search = Input.Search
const Option= Select.Option
const { TextArea } = Input;

const ShowTags=({data,dispatch})=> {
  const  tagsClose =(tagId)=>{
    removeTag(tagId)
  }
  const removeTag=(tagId)=>{
    dispatch({
      type: 'portrait/removeTag',
      payload: tagId
    })
  }

  return data.map((item) => {
    return (<Tag color="blue" closable key={item.tagId} afterClose={() => tagsClose(item.tagId)}>{item.tagName}</Tag>)
  });
}

const modal = ({ showModel, dispatch, form,subClass,portraitItem,classList }) => {

    const { getFieldDecorator } = form

    const formItemLayout = {
        labelCol: {
            span: 5,
        },
        wrapperCol: {
            span: 16,
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
        dispatch({
          type: 'portrait/tagModalList',
          payload: []
        })

        form.resetFields()
    }

    const submit = () =>{
        form.validateFields(['portraitName','description','classId'],(err, values) => {
            if (!err) {
              console.log(values)
              if (portraitItem.tagList==undefined||portraitItem.tagList.length==0){
                return
              }
              portraitItem.portraitName=values.portraitName
              portraitItem.description=values.description
              portraitItem.classId=values.classId
              dispatch({type: 'portrait/update',payload:portraitItem})
              .then(data=>{
                dispatch({type: 'portrait/showModel',payload: false})
                dispatch({type: 'portrait/clearItem',payload: false})
                dispatch({type: 'portrait/clearItem'})
              })

            }
        });
    }
    return (
        <Modal
            title={ portraitItem.portraitId ? '编辑画像' : '新增画像' }
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
                    {getFieldDecorator('portraitName', {
                      initialValue: portraitItem.portraitName,
                      rules: [
                        { required: true, message: '请输入画像名称' },
                        { pattern: /^([0-9\u4e00-\u9fa5]{1,8})$/, message: '请输入1-8个中文或者数字字符' }
                      ],
                    })(
                      <Input placeholder="请输入" />
                    )}
                  </FormItem>
                </Col>
                <Col span={12} >
                  <FormItem {...formItemLayout}  label="画像分类：">
                    {getFieldDecorator('classId', {
                      initialValue: portraitItem.classId,
                      rules: [
                        { required: true, message: '请选择图片分类' },
                      ],
                    })(
                    <Select
                      showSearch
                      style={{ width: 200 }}
                      placeholder="请选择画像分类"
                      optionFilterProp="children"
                      filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                      {children}
                    </Select>
                    )}
                  </FormItem>
                </Col>
              </Row>
                <span style={{color:'black'}}>包含标签：</span>
              <Button type="primary" shape="circle" icon="plus"  style={{width:'24px',height:'24px'}} onClick={showSelectTags}/>
              <div style={{minHeight:'100px',padding:'10px'}}>
                <Row type="flex" gutter={24}>
                  <ShowTags data={portraitItem.tagList} dispatch={dispatch}/>
                </Row>
              </div>

                <FormItem label="画像描述（规则、用途等）："  >
                    {getFieldDecorator('description', {
                      initialValue: portraitItem.description,
                        rules: [
                          { required: true, message: '请输入画像描述（规则、用途等）' },
                        ],
                    })(
                      <TextArea rows={4}  placeholder="请输入画像描述（规则、用途等）" />
                    )}
                </FormItem>
            </Form>
        </Modal>
    )
}

const modalWrap = Form.create()(modal);

export default modalWrap
