import React from 'react'
import { connect } from 'dva';
import { Link } from 'react-router-dom'
import { Table, Divider, Modal,Message } from 'antd';
import Head from './Head'
import ClassModal from './Modal'
import TagModal from './TagsModal'
import {timestampToDate} from '../../utils/utils'
const confirm = Modal.confirm;

class List extends React.Component {

    componentDidMount(){
        const { dispatch } = this.props

        dispatch({ type: 'portrait/query'});
        dispatch({ type: 'classify/query',payload:{pageNo:1,pageSize:99}});
        dispatch({ type: 'tags/query',payload:{pageNo:1,pageSize:99}});

    }

    render() {
        const { list,classList,tagsList, dispatch,showModel,subClass,portraitItem,showTagModel,tagName,expandedKeys,autoExpandParent,checkedKeys,selectedKeys } = this.props

        const modalProps = {
            showModel,
            dispatch,
            subClass,
            portraitItem,
            showTagModel,
            tagName,
            classList,
            tagsList,
            expandedKeys,
            autoExpandParent,
            checkedKeys,
            selectedKeys
        }

        const onDel = (id) => {
            confirm({
                title: '确认删除？',
                content: '',
                onOk() {
                    dispatch({
                        type: 'portrait/delClass',
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
            title: '画像ID',
            dataIndex: 'portraitId',
            key: 'portraitId'
        },
          {
            title: '画像名称',
            dataIndex: 'portraitName',
            key: 'portraitName'
        },
          {
            title: '画像分类',
            key: 'classification',
            render:(row,record)=>{
              return(
                <span>
                  {row.classification.className}
                </span>
              )
            }
          },
          {
            title: '包含标签',
            key: 'tagList',
            render:(row, record)=>{
              return(
                <span>
              {row.tagList.map((item,index) =>
                  {
                    return item.tagName}
              )}
            </span>)
            }
          },
          {
            title: '覆盖人数',
            dataIndex: 'personNum',
            key: 'personNum'
          },
          {
            title: '创建时间',
            dataIndex: 'instDate',
            key: 'instDate',
            render: text => {return timestampToDate(text)},
          },
          {
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
                <TagModal {...modalProps}/>
                <ClassModal {...modalProps} />
                <Head dispatch={dispatch} />
                <Table columns={columns} dataSource={list} rowKey="classId" />
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
      ...state.portrait,
      classList:state.classify.list,
      tagsList:state.tags.list,
    }
}

export default connect(mapStateToProps)(List);
