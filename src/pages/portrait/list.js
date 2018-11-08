import React from 'react'
import { connect } from 'dva';
import { Table, Divider, Modal, Message, Spin,Tag } from 'antd';
import Head from './Head'
import ClassModal from './Modal'
import { timestampToDate } from '../../utils/utils'
import ModalTree from '../../components/modalTree/modal'
const confirm = Modal.confirm;

const getData = (data) => {
    return data.map((item) => {
        if (item.tagList.length !== 0) {
            let temp = {}
            temp.id = item.classId
            temp.name = item.className
            temp.children = item.tagList.map((subItem) => {
                let subtemp = {}
                subtemp.id = subItem.tagId
                subtemp.name = subItem.tagName
                return subtemp
            })
            return temp
        }
        return null
    }).filter((item, i, self) => item && self.indexOf(item) === i);
}

const getCheckedKeys = (data) => {
  if (data.tagList === undefined)
    return []

    return data.tagList.map((item) => {
        return item.tagId
    }).filter((item, i, self) => item && self.indexOf(item) === i);
}

class List extends React.PureComponent {

    componentDidMount() {
        const { dispatch } = this.props

        dispatch({ type: 'portrait/query' });
        dispatch({ type: 'portrait/queryClassListByTag', payload: {} });
        dispatch({ type: 'portrait/querySubLevelClassList', payload: { pageNo: 1, pageSize: 99 } });
    }

   onPageChange = (pageNo, pageSize) => {
     const { dispatch } = this.props
    dispatch({ type: 'portrait/query', payload: { pageNo, pageSize } })
  }

   onShowSizeChange = (pageNo, pageSize) => {
     const { dispatch } = this.props
    dispatch({ type: 'portrait/query', payload: { pageNo, pageSize } })
  }

   onDel = (portraitId) => {
     const { dispatch } = this.props
    confirm({
      title: '确认删除？',
      content: '',
      onOk() {
        dispatch({
          type: 'portrait/delPortrait',
          payload: portraitId
        }).then(data => {
          if (data.code === '0000') {
          } else {
            Message.error(data.msg)
          }
        })
      },
    });
  }

   onEdit = (portraitId) => {
     const { dispatch } = this.props
    dispatch({
      type: 'portrait/queryPortraitId',
      payload: portraitId
    }).then(data => {
      if (data.code === '0000')
        dispatch({type: 'portrait/save',payload: {showModel:true}})
    })
  }

    render() {
        const { list, classList, dispatch, showModel, portraitItem, showTagModel, listClassTag, pagination, loading } = this.props
        const { total, current, pageSize } = pagination

        const modalProps = {
            showModel,
            dispatch,
            portraitItem,
            classList,
        }
        const paginationProps = {
            showQuickJumper: true,
            showSizeChanger: true,
            total: total,
            onChange: this.onPageChange,
            onShowSizeChange: this.onShowSizeChange,
            showTotal: total => `共 ${total} 条`,
        }
        const tree = getData(listClassTag)
        const treeProps = {
            showModel: showTagModel,
            dispatch,
            title: '选择包含标签',
            tree: tree,
            checkedKeys: getCheckedKeys(portraitItem),
            onSubmit: (keys) => dispatch({ type: 'portrait/tagModalList', payload: keys.filter((item, i, self) => item && self.indexOf(item) === i) }),
            handleCancel: () => dispatch({ type: 'portrait/save', payload:{showTagModel:false}  })

        }

        const columns = [{
            title: '序号',
            dataIndex: 'index',
            key: 'index',
            width:'80px',
            render(text, record, index) {
                return (current - 1) * pageSize + index + 1
            }
        },
        {
            title: '画像名称',
            dataIndex: 'portraitName',
            key: 'portraitName',
            width:'120px',
        },
        {
            title: '画像分类',
            key: 'classification',
            width:'160px',
            render: (row, record) => {
                return (
                    <span>
                        {row.classification.className}
                    </span>
                )
            }
        },
        {
            title: '包含标签',
            key: 'tagList',
            render: (row, record) => {
                return (
                    <span>
                        {row.tagList.map((item, index) => {
                            return <Tag key={item.tagId} color='blue'>{item.tagName}</Tag>
                        }
                        )}
                    </span>)
            }
        },
        {
            title: '覆盖人数',
            dataIndex: 'personNum',
            key: 'personNum',
            width:'100px',
        },
        {
            title: '创建时间',
            dataIndex: 'instDate',
            key: 'instDate',
            width:'110px',
            render: text => { return timestampToDate(text) },
        },
        {
            title: '操作',
            key: 'action',
            width:'110px',
            render: (row, record) => (
                <span>
                    <a href="javascript:" onClick={() => this.onEdit(row.portraitId)}>编辑</a>
                    <Divider type="vertical" />
                    <a href="javascript:" onClick={() => this.onDel(row.portraitId)}>删除</a>
                </span>
            ),
        }];

        return (
            <Spin spinning={loading}>
                <ModalTree {...treeProps} />
                <ClassModal {...modalProps} />
                <Head dispatch={dispatch} />
                <Table columns={columns} dataSource={list} rowKey="portraitId" pagination={paginationProps} />
            </Spin>
        );
    }
}
function mapStateToProps(state) {
    return {
        ...state.portrait,
        loading: state.loading.global
    }
}

export default connect(mapStateToProps)(List);
