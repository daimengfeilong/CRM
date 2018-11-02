import React from 'react'
import { connect } from 'dva'
import { withRouter } from 'dva/router'
import './userList.less'
import { Input, Modal, Form, Message,  Tree,  Icon, List, Popconfirm, Button, Table } from 'antd'
import HeadUserList from './head'

let params = {
  userNo: "",
  idCard: "",
  phone: "",
  userName: "",
  regStartTime: "",
  regEndTime: ""
}
class userList extends React.Component {
  componentDidMount () {
    const { dispatch, history } = this.props

    dispatch({ type: 'userList/query', payload: {pageNo:1, pageSize:10, params}});
  }

  toDetail (text, record) {
    console.log(text)
    console.log(record)
  }

  render() {
    const { dispatch, list, pagination} = this.props
    const columns = [
      {
        title: '用户编号',
        dataIndex: 'userNo',
        key: 'userNo'
      }, {
        title: '姓名',
        dataIndex: 'userName',
        key: 'userName'
      }, {
        title: '性别',
        dataIndex: 'sex',
        key: 'sex'
      }, {
        title: '年龄',
        dataIndex: 'age',
        key: 'age'
      }, {
        title: '证件号',
        dataIndex: 'idCard',
        key: 'idCard'
      }, {
        title: '学历',
        key: 'education',
        dataIndex: 'education'
      }, {
        title: '注册时间',
        dataIndex: 'regTime',
        key: 'regTime'
      }, {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <span>
            <a href="javascript:;" onClick={() => this.toDetail(text, record)}>详情</a>
          </span>
        )
      }
    ]

    const onPageChange = (page, pageSize) => {
      dispatch({ type: 'userList/query',payload:{pageNo:page, pageSize, params}})
    }

    const onShowSizeChange = (page, pageSize) => {
      dispatch({ type: 'userList/query',payload:{pageNo: page, pageSize, params}})
    }

    const paginationProps = {
      showQuickJumper: true,
      showSizeChanger: true,
      total: pagination.total,
      onChange: onPageChange,
      onShowSizeChange: onShowSizeChange,
      showTotal: total => `共 ${total} 条`
    }


    return (
      <div>
        <HeadUserList dispatch={dispatch} />
        <Table columns={columns} dataSource={list} rowKey="userNo" pagination={paginationProps}/>
      </div>

    )
  }
}

function mapStateToProps(state) {
  return state.userList
}


export default withRouter(connect(mapStateToProps)(userList));
