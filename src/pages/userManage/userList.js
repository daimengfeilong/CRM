import { connect } from 'dva'
import React from 'react'
import './userList.css'
import { Input,  Modal, Form, Message,  Tree,  Icon, List, Popconfirm, Button, } from 'antd'
import HeadUserList from './head'

const FormItem = Form.Item
const Search = Input.Search



class content extends React.Component {

  render () {

    const {form, dispatch} = this.props
    // console.log(state.count)
    const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = form

    function handleDelete (id) {
      dispatch({
        type: 'userList/delete',
        payload: id,
      })
    }

    function edit (id) {
      dispatch({
        type: 'userList/edit',
        payload: id,
      })
    }

    //添加子分类
    const testName = (val) => {
      form.validateFields(['testName'], (err, values) => {
        console.log(val)
        if (!err) {
          dispatch({
            type: 'userList/addThings',
            payLoad: {
              id: Date.now(),
              name: val,
              description: 'Ant Design, a design language for background applications, is refined by Ant UED Team.',
            },
          })
          form.resetFields(['testName'])
        }
      })
    }
    return (
      <Form>
        <HeadUserList/>

        <div>
          <h2>{this.props.count}</h2>
          <button key="add"
                  onClick={() => {
                    this.props.dispatch({type: 'userList/add'})
                  }}>+
          </button>
          <button key="minus"
                  onClick={() => {
                    this.props.dispatch({type: 'userList/minus'})
                  }}>-
          </button>
        </div>

        <FormItem label="分类名称">
          {getFieldDecorator('testName', {
            rules: [{required: true, message: '内容不能为空'}],
          })(
            <Search
              placeholder="请输入 todo things"
              enterButton="添加"
              size="large"
              onSearch={testName}
            />,
          )}
        </FormItem>

        <List
          size="small"
          // grid={{gutter: 16, column: 2}}
          itemLayout="vertical"
          bordered
          dataSource={this.props.things}
          renderItem={item => (
            <List.Item
              extra={
                <div class="just-content">
                  <Popconfirm title="Delete?"
                              onConfirm={() => handleDelete(item.id)}>
                    <Button>Delete</Button>
                  </Popconfirm>
                </div>}>
              <List.Item.Meta
                title={item.name}
                description={item.description}
              />
            </List.Item>)}
        />
      </Form>

    )
  }
}

function mapStateToProps (state) {
  return state.userList
}

const modalWrap = Form.create()(content)

export default connect(mapStateToProps)(modalWrap)
