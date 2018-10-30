import { connect } from 'dva'
import React from 'react'
import './userList.css'
import { Input,  Modal, Form, Message,  Tree,  Icon, List, Popconfirm, Button, } from 'antd'
import HeadUserList from './head'

const FormItem = Form.Item
const Search = Input.Search



class content extends React.Component {

  render () {

    const { dispatch} = this.props

    return (
      <div>
        <HeadUserList/>

      </div>

    )
  }
}

function mapStateToProps (state) {
  return state.userList
}


export default connect(mapStateToProps)(content)
