import React from 'react'
import { connect } from 'dva';
import { Table, Divider, Modal,Message } from 'antd';
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

    componentDidMount(){
        const { dispatch } = this.props

        dispatch({ type: 'classify/query'});
    }

    render() {
        const { list, dispatch,showModel,subClass,classItem,pagination } = this.props

        const modalProps = {
            showModel,
            dispatch,
            subClass,
            classItem
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

        //删除分类
        const onDel = (id) => {
            confirm({
                title: '确认删除？',
                content: '',
                okText:'确认',
                cancelText:'取消',
                onOk() {
                    dispatch({
                        type: 'classify/delClass',
                        payload:{classId:id}
                    }).then(data => {
                        if(data.code === '0000'){

                        }else{
                            Message.error(data.msg)
                        }
                    })
                },
            });
        }

        //分类编辑
        const onEdit = (id) => {
            dispatch({
                type: 'classify/queryClassId',
                payload:{classId:id}
            }).then(data => {
                dispatch({
                    type: 'classify/save',
                    payload: {
                        showModel:true
                    }
                })
            })
        }

        const columns = [{
            title: '序号',
            dataIndex: 'index',
            key: 'index',
            render (text, record, index) {
                return index + 1
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
            render:(row,record) => (
                <span>{`${row}（${record.subClassNum}）`}</span>
            )
        }, {
            title: '操作',
            key: 'action',
            render: (row, record) => (
                <span>
                    <a href="javascript:" onClick={() => onEdit(row.classId)}>编辑</a>
                    <Divider type="vertical" />
                    <a href="javascript:" onClick={() => onDel(row.classId)}>删除</a>
                </span>
            ),
        }];

        return (
            <>
                {showModel && <ClassModal {...modalProps} />}
                <Head dispatch={dispatch} />
                <Table columns={columns} dataSource={list} rowKey="classId" pagination={paginationProps} />
            </>
        );
    }
}
function mapStateToProps(state) {
    return state.classify
}

export default connect(mapStateToProps)(List);