import React from 'react'
import { connect } from 'dva';
import { Table, Divider, Modal, Message, Spin } from 'antd';
import Head from './Head'
import ClassModal from './Modal'
import './classify.less'

const confirm = Modal.confirm;

/**
 * 分类列表
 * zxl 
 * @param {*} props
 * @returns List
 * 
 */
class List extends React.Component {

    componentDidMount() {
        const { dispatch } = this.props

        dispatch({ type: 'classify/query' });
    }

    onPageChange = (pageNo, pageSize) => {
        const { dispatch } = this.props

        dispatch({ type: 'classify/query', payload: { pageNo, pageSize } })
    }

    onShowSizeChange = (pageNo, pageSize) => {
        const { dispatch } = this.props
        dispatch({ type: 'classify/query', payload: { pageNo, pageSize } })
    }

    //删除分类
    onDel = (id) => {
        const { dispatch } = this.props

        confirm({
            title: '确认删除？',
            content: '',
            okText: '确认',
            cancelText: '取消',
            onOk() {
                dispatch({
                    type: 'classify/delClass',
                    payload: { classId: id }
                }).then(data => {
                    if (data.code === '0000') {

                    } else {
                        Message.error(data.msg)
                    }
                })
            },
        });
    }

    //分类编辑
    onEdit = (id) => {
        const { dispatch } = this.props

        dispatch({
            type: 'classify/queryClassId',
            payload: { classId: id }
        }).then(data => {
            dispatch({
                type: 'classify/save',
                payload: {
                    showModel: true
                }
            })
        })
    }
    render() {
        const { list, dispatch, showModel, subClass, classItem, pagination, loading } = this.props
        const { total, current, pageSize } = pagination

        const modalProps = {
            showModel,
            dispatch,
            subClass,
            classItem
        }

        const paginationProps = {
            showQuickJumper: true,
            showSizeChanger: true,
            total: total,
            onChange: this.onPageChange,
            onShowSizeChange: this.onShowSizeChange,
            showTotal: total => `共 ${total} 条`,
        }

        const columns = [{
            title: '序号',
            dataIndex: 'index',
            key: 'index',
            render(text, record, index) {
                return (current - 1) * pageSize + index + 1
            }
        },
        {
            title: '分类ID',
            dataIndex: 'classId',
            key: 'classId'
        }, {
            title: '分类名称',
            dataIndex: 'className',
            key: 'className',
            render: (row, record) => (
                <span>{`${row}（${record.subClassNum}）`}</span>
            )
        }, {
            title: '操作',
            key: 'action',
            render: (row, record) => (
                <span>
                    <a href="javascript:" onClick={() => this.onEdit(row.classId)}>编辑</a>
                    <Divider type="vertical" />
                    <a href="javascript:" onClick={() => this.onDel(row.classId)}>删除</a>
                </span>
            ),
        }];

        return (
            <Spin spinning={loading}>
                {showModel && <ClassModal {...modalProps} />}
                <Head dispatch={dispatch} />
                <Table columns={columns} dataSource={list} rowKey="classId" pagination={paginationProps} />
            </Spin>
        );
    }
}
function mapStateToProps(state) {
    return {
        ...state.classify,
        loading: state.loading.global
    }
}

export default connect(mapStateToProps)(List);