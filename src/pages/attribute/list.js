import React from 'react'
import { connect } from 'dva';
import { Link } from 'react-router-dom'
import { Table, Divider, Modal,Message } from 'antd';
import ClassModal from './Modal'
import {timestampToDate} from '../../utils/utils'
const confirm = Modal.confirm;

class List extends React.Component {

    componentDidMount(){
        const { dispatch } = this.props

        dispatch({ type: 'portrait/query'});
    }

    render() {
        const { list, dispatch,showModel,subClass,classItem } = this.props

        const modalProps = {
            showModel,
            dispatch,
            subClass,
            classItem
        }
        const onCheck = (id) => {
            dispatch({
                type: 'portrait/queryClassId',
                payload:{classId:id}
            }).then(data => {
                dispatch({
                    type: 'portrait/showModel',
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
            title: '一级属性',
            dataIndex: 'portraitName',
            key: 'portraitName'
        },
          {
            title: '二级属性',
            dataIndex: 'portraitId',
            key: 'portraitId'
          },
          {
            title: '三级属性',
            key: 'tagList'
          },
          {
            title: '包含的四级属性',
            dataIndex: 'personNum',
            key: 'personNum'
          },
          {
            title: '操作',
            key: 'action',
            render: (row, record) => (
                <span>
                    <a href="javascript:" onClick={() => onCheck(row.classId)}>查看子值</a>
                </span>
            ),
        }];

        return (
            <div>
                <ClassModal {...modalProps} />
                <Table columns={columns} dataSource={list} rowKey="classId" />
            </div>
        );
    }
}
function mapStateToProps(state) {
    return state.portrait
}

export default connect(mapStateToProps)(List);
