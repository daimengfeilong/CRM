import { Modal,Form,Input } from 'antd'


const FormItem = Form.Item;
const TextArea = Input.TextArea

const UpdateRemarkModal=({dispatch,form,description,showModel})=>{


  const { getFieldDecorator }=form

  const formItemLayout = {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 20,
    },
  }

  const handleCancel=()=>{
    dispatch({ type: 'userDetail/save',payload:{showModel:false}});
  }

  const submit=()=>{
    form.validateFields(['description'],(err, values) => {
      if (!err) {
          dispatch({type: 'userDetail/updateUserRemark',payload:values.description})
          .then(data=>{
            if (data.code === '0000'){
              dispatch({type: 'userDetail/showModel',payload: {showModel:false}})
              dispatch({type: 'userDetail/queryUserRemark'})
            }
          })

      }
    });
  }

  return(
    <Modal
      title="编辑备注"
      width="450px"
      okText="保存"
      cancelText="取消"
      afterClose={handleCancel}
      visible={showModel}
      onCancel={handleCancel}
      onOk={submit}>
      <Form>
        <FormItem label="备注：" {...formItemLayout}>
          {getFieldDecorator('description', {
            initialValue: description,
            rules: [
              { required: true, message: '请输入画像描述（规则、用途等）' },
            ],
          })(
            <TextArea rows={4}  placeholder="请输入备注"/>
          )}
        </FormItem>
      </Form>
    </Modal>
  )
}
const modal = Form.create()(UpdateRemarkModal)

export default modal
