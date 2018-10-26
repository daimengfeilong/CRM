import { connect } from 'dva'
import React from 'react'
import './test.css'
import {
  Input,
  Modal,
  Form,
  Message,
  Tree,
  Icon,
  List,
  Popconfirm,
  Button,
} from 'antd'

const FormItem = Form.Item
const Search = Input.Search

class TestError extends React.Component {
  componentDidCatch (e) {
    alert(e.message)
  }

  componentDidMount () {
    // throw new Error('a');
  }

  render () {

    return <div>TestError</div>
  }
}

class content extends React.Component {

  render () {

    const {form, dispatch} = this.props
    // console.log(state.count)
    const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = form

    function handleDelete (id) {
      dispatch({
        type: 'test/delete',
        payload: id,
      })
    }
    function edit (id) {
      dispatch({
        type: 'test/edit',
        payload: id,
      })
    }
    //添加子分类
    const testName = (val) => {
      form.validateFields(['testName'], (err, values) => {
        console.log(val)
        if (!err) {
          dispatch({
            type: 'test/addThings',
            payLoad: {
              id: Date.now(),
              name: val,
              description:'Ant Design, a design language for background applications, is refined by Ant UED Team.'
            },
          })
          form.resetFields(['testName'])
        }
      })
    }
    return (
      <Form>
        <div>
          <TestError/>
          <h2>{this.props.count}</h2>
          <button key="add"
                  onClick={() => { this.props.dispatch({type: 'test/add'})}}>+
          </button>
          <button key="minus"
                  onClick={() => { this.props.dispatch({type: 'test/minus'})}}>-
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
  return state.test
}

const modalWrap = Form.create()(content)

export default connect(mapStateToProps)(modalWrap)
