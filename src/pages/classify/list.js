import React from 'react'
import { connect } from 'dva';
import { Link } from 'react-router-dom'
import { Table, Divider, Modal,Message } from 'antd';
import Head from './Head'
import ClassModal from './Modal'

const confirm = Modal.confirm;

class List extends React.Component {

    componentDidMount(){
        const { dispatch } = this.props

        dispatch({ type: 'classify/query'});
    }

    render() {
        const { list, dispatch,showModel,subClass,classItem } = this.props

        const modalProps = {
            showModel,
            dispatch,
            subClass,
            classItem
        }

        const onDel = (id) => {
            confirm({
                title: '确认删除？',
                content: '',
                onOk() {
                    dispatch({
                        type: 'classify/delClass',
                        payload:{classId:id}
                    }).then(data => {
                        if(data.code == '0000'){

                        }else{
                            Message.error(data.msg)
                        }
                    })
                },
            });
        }

        const onEdit = (id) => {
            dispatch({
                type: 'classify/queryClassId',
                payload:{classId:id}
            }).then(data => {
                dispatch({
                    type: 'classify/showModel',
                    payload: true
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
            key: 'className'
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
            <div>
                <ClassModal {...modalProps} />
                <Head dispatch={dispatch} />
                <Table columns={columns} dataSource={list} rowKey="classId" />
            </div>
        );
    }
}
function mapStateToProps(state) {
    return state.classify
}

export default connect(mapStateToProps)(List);