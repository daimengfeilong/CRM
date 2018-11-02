import React from 'react'
import { connect } from 'dva';
import { Link } from 'react-router-dom'
import { Table, Divider, Modal,Message } from 'antd';
import Head from './Head'
import ClassModal from './Modal'
import {timestampToDate} from '../../utils/utils'
import ModalTree from '../../components/modalTree/modal'
const confirm = Modal.confirm;

const  getData=(data)=>{
  return  data.map((item)=>{
    if (item.tagList.length!=0){
      let temp={}
      temp.id=item.classId
      temp.name=item.className
      temp.children=item.tagList.map((subItem)=>{
        let subtemp={}
        subtemp.id= subItem.tagId
        subtemp.name= subItem.tagName
        return subtemp
      })
      return temp
    }
    return null
  }).filter((item, i, self) => item && self.indexOf(item) === i);
}

const  getCheckedKeys = (data)=>{
  return data.map((item)=>{
      return item.tagId
  }).filter((item, i, self) => item && self.indexOf(item) === i);
}


class List extends React.PureComponent {



    componentDidMount(){
        const { dispatch } = this.props

        dispatch({ type: 'portrait/query'});
        dispatch({ type: 'portrait/queryClassListByTag',payload:{}});
        dispatch({ type: 'portrait/querySubLevelClassList',payload:{pageNo:1,pageSize:99}});
    }

    render() {
        const { list,classList,tagsList, dispatch,showModel,portraitItem,showTagModel,listClassTag,pagination } = this.props

        const modalProps = {
              showModel,
              dispatch,
              portraitItem,
              classList,
        }


      const onPageChange = (page, pageSize) => {
        dispatch({ type: 'portrait/query',payload:{pageNo:page}})
      }

      const onShowSizeChange = (page, pageSize) => {
        dispatch({ type: 'portrait/query',payload:{pageNo:page,pageSize}})
      }
      const paginationProps = {
        showQuickJumper:true,
        showSizeChanger:true,
        total:pagination.total,
        onChange:onPageChange,
        onShowSizeChange:onShowSizeChange,
        showTotal:total => `共 ${total} 条`,
      }
      const tree =getData(listClassTag)
      const treeProps = {
        showModel:showTagModel,
        dispatch,
        title:'选择包含标签',
        tree:tree,
        checkedKeys:getCheckedKeys(portraitItem.tagList),
        onSubmit:(keys) => dispatch({type:'portrait/tagModalList',payload:keys.filter((item, i, self) => item && self.indexOf(item) === i)}),
        handleCancel:() => dispatch({type:'portrait/showTagModel',payload:false})

      }
        const onDel = (portraitId) => {
            confirm({
                title: '确认删除？',
                content: '',
                onOk() {
                    dispatch({
                        type: 'portrait/delPortrait',
                        payload:portraitId
                    }).then(data => {
                        if(data.code == '0000'){

                        }else{
                            Message.error(data.msg)
                        }
                    })
                },
            });
        }

        const onEdit = (portraitId) => {
            dispatch({
                type: 'portrait/queryPortraitId',
                payload:portraitId
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
                    <a href="javascript:" onClick={() => onEdit(row.portraitId)}>编辑</a>
                    <Divider type="vertical" />
                    <a href="javascript:" onClick={() => onDel(row.portraitId)}>删除</a>
                </span>
            ),
        }];

        return (
            <div>
              <ModalTree {...treeProps}/>
                {/*<TagModal {...modalTagsProps}/>*/}
                <ClassModal {...modalProps} />
                <Head dispatch={dispatch} />
                <Table columns={columns} dataSource={list} rowKey="portraitId"  pagination={paginationProps} />
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
      ...state.portrait
    }
}

export default connect(mapStateToProps)(List);
