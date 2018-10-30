import React from 'react'
import { connect } from 'dva';
import { Table, Divider, Tag, Modal } from 'antd';
import Head from './Head'

const confirm = Modal.confirm;

class List extends React.Component {

    componentDidMount(){
        const { dispatch } = this.props

        dispatch({ type: 'tags/query'});
    }

    render() {
        const { list, dispatch, pagination } = this.props

        const del = (id) => {
            confirm({
                title: '确认删除？',
                content: '',
                onOk() {
                    dispatch({
                        type: 'tags/del',
                        payload: { _id: id }
                    })
                },
            });
        }

        const onPageChange = (page, pageSize) => {
            dispatch({ type: 'classify/query',payload:{pageNo:page}})
        }

        const onShowSizeChange = (page, pageSize) => {
            dispatch({ type: 'classify/query',payload:{pageSize}})
        }

        const paginationProps = {
            showQuickJumper:true,
            showSizeChanger:true,
            total:pagination.total,
            onChange:onPageChange,
            onShowSizeChange:onShowSizeChange,
            showTotal:total => `共 ${total} 条`,
        }

        const columns = [{
            title: '序号',
            dataIndex: 'index',
            key: 'index',
            render (text, record, index) {
                return index + 1
            } 
        },{
            title: '标签ID',
            dataIndex: 'tagId',
            key: 'tagId'
        }, {
            title: '标签名称',
            dataIndex: 'tagName',
            key: 'tagName'
        }, {
            title: '标签类别',
            dataIndex: 'classification',
            key: 'classification',
            render: row => row.className,
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
                <span>
                    <a href="javascript:">编辑</a>
                    <Divider type="vertical" />
                    <a href="javascript:">删除</a>
                </span>
            ),
        }];

        return (
            <div>
                <Head dispatch={dispatch} />
                <Table columns={columns} dataSource={list} rowKey="tagId" pagination={paginationProps} />
            </div>
        );
    }
}
function mapStateToProps(state) {
    return state.tags
}

export default connect(mapStateToProps)(List);