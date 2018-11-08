import React from 'react'
import { connect } from 'dva'
import { withRouter } from 'dva/router'
import { Link } from 'react-router-dom'
import './userList.less'
import { Table, Spin } from 'antd'
import HeadUserList from './head'

let params = {
    userNo: "",
    idCard: "",
}
class userList extends React.Component {
    componentDidMount() {
        const { dispatch } = this.props

        dispatch({ type: 'userList/query', payload: { pageNo: 1, pageSize: 10, params } });
    }

   onPageChange = (page, pageSize) => {
     const { dispatch } = this.props
    dispatch({ type: 'userList/query', payload: { pageNo: page, pageSize, params } })
  }

   onShowSizeChange = (page, pageSize) => {
     const { dispatch } = this.props
    dispatch({ type: 'userList/query', payload: { pageNo: page, pageSize, params } })
  }
    render() {
        const { dispatch, list, pagination, loading } = this.props
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
                    <Link to={'/userManage/userDetail?userNo=' + record.userNo + '&idCard=' + record.idCard}>详情</Link>
                )
            }
        ]
        const paginationProps = {
            showQuickJumper: true,
            showSizeChanger: true,
            total: pagination.total,
            onChange: this.onPageChange,
            onShowSizeChange: this.onShowSizeChange,
            showTotal: total => `共 ${total} 条`
        }
        return (
            <Spin spinning={loading}>
                <HeadUserList dispatch={dispatch} />
                <Table columns={columns} dataSource={list} rowKey="userNo" pagination={paginationProps} />
            </Spin>

        )
    }
}

function mapStateToProps(state) {
    return {
        ...state.userList,
        loading: state.loading.global
    }
}


export default withRouter(connect(mapStateToProps)(userList));
