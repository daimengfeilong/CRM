import React from 'react'
import { connect } from 'dva';
import { Link } from 'react-router-dom'
import { Table, Divider, Tag, Modal, Spin } from 'antd';
import Head from './Head'

const confirm = Modal.confirm;

class List extends React.Component {

    componentDidMount(){
        const { dispatch } = this.props

        dispatch({ type: 'tags/query'});
    }

    del = (id) => {
        const { dispatch } = this.props

        confirm({
            title: '确认删除？',
            content: '',
            onOk() {
                dispatch({
                    type: 'tags/del',
                    payload: { tagId: id }
                })
            },
        });
    }

    onPageChange = (pageNo, pageSize) => {
        const { dispatch } = this.props

        dispatch({ type: 'tags/query',payload:{pageNo, pageSize}})
    }

    onShowSizeChange = (pageNo, pageSize) => {
        const { dispatch } = this.props

        dispatch({ type: 'tags/query',payload:{pageNo, pageSize}})
    }

    render() {
        const { list, dispatch, pagination, loading } = this.props
        const { total, current, pageSize } = pagination

        const paginationProps = {
            showQuickJumper:true,
            showSizeChanger:true,
            total:total,
            onChange:this.onPageChange,
            onShowSizeChange:this.onShowSizeChange,
            showTotal:total => `共 ${total} 条`,
        }

        const columns = [{
            title: '序号',
            dataIndex: 'index',
            key: 'index',
            render (text, record, index) {
                return (current - 1) * pageSize + index + 1
            } 
        }, {
            title: '标签名称',
            dataIndex: 'tagName',
            key: 'tagName'
        }, {
            title: '标签类别',
            dataIndex: 'classification',
            key: 'classification',
            render: row => row ? row.className : '',
        }, {
            title: '包含属性',
            dataIndex: 'attrList',
            key: 'attrList',
            render:(list) => (
                <span>
                    {list.map(tag => <Tag color="blue" key={tag.attrId}>{tag.attrName}</Tag>)}
                </span>
            )
        }, {
            title: '覆盖人数',
            dataIndex: 'personNum',
            key: 'personNum'
        }, {
            title: '创建时间',
            dataIndex: 'instDate',
            key: 'instDate'
        }, {
            title: '操作',
            key: 'action',
            render: (row, record) => (
                <>
                    <Link to={`/tags/edit?id=${row.tagId}`}>编辑</Link>
                    <Divider type="vertical" />
                    <a href="javascript:" onClick={() => this.del(row.tagId)}>删除</a>
                </>
            ),
        }];

        return (
            <Spin spinning={loading}>
                <Head dispatch={dispatch} />
                <Table columns={columns} dataSource={list} rowKey="tagId" pagination={paginationProps} />
            </Spin>
        );
    }
}
function mapStateToProps(state) {
    return {
        ...state.tags,
        loading:state.loading.global
    }
}

export default connect(mapStateToProps)(List);