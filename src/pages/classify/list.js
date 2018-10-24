import React from 'react'
import { connect } from 'dva';
import { Link } from 'react-router-dom'
import { Table, Divider, Tag, Row, Col, Button,Search } from 'antd';
import Head from './Head'
import Modal from './Modal'

const confirm = Modal.confirm;

class List extends React.Component {

    componentDidMount(){
        const { dispatch } = this.props

        dispatch({ type: 'classify/query'});
    }

    render() {
        const { list, dispatch,showModel,subClass } = this.props

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

        const modalProps = {
            showModel,
            dispatch,
            subClass
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
                    <a href="javascript:">编辑</a>
                    <Divider type="vertical" />
                    <a href="javascript:">删除</a>
                </span>
            ),
        }];

        return (
            <div>
                <Modal {...modalProps} />
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