import React from 'react'
import { connect } from 'dva';
import { Table, Spin } from 'antd';
import Modal from './Modal'

class List extends React.Component {

    componentDidMount() {
        const { dispatch } = this.props

        dispatch({
            type: 'attribute/query'
        })
    }

    showFourAttr = (id) => {
        const { dispatch } = this.props

        dispatch({
            type: 'tagsEdit/getAttributeListEnum',
            payload: {
                attrId: id
            }
        }).then(data => {
            dispatch({
                type: 'attribute/save',
                payload: {
                    showModel: true
                }
            })
        })
    }

    onPageChange = (pageNo, pageSize) => {
        const { dispatch } = this.props

        dispatch({ type: 'attribute/query', payload: { pageNo,pageSize } })
    }

    onShowSizeChange = (pageNo, pageSize) => {
        const { dispatch } = this.props
        
        dispatch({ type: 'attribute/query', payload: { pageNo,pageSize } })
    }

    render() {
        const { dispatch, list, pagination, showModel, attrItem, loading } = this.props
        const { total, current, pageSize } = pagination

        const modalProps = {
            dispatch,
            showModel,
            attrItem
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
            title: '一级属性',
            dataIndex: 'firstAttrName',
            key: 'firstAttrName'
        },
        {
            title: '二级属性',
            dataIndex: 'secondAttrName',
            key: 'secondAttrName'
        },
        {
            title: '三级属性',
            dataIndex: 'thirdAttrName',
            key: 'thirdAttrName'
        },
        {
            title: '包含的四级属性',
            dataIndex: 'fourthAttrNum',
            key: 'fourthAttrNum'
        },
        {
            title: '操作',
            key: 'action',
            render: (row, record) => (
                <a href="javascript:" onClick={() => this.showFourAttr(row.thirdAttrId)}>查看子值</a>
            ),
        }];

        return (
            <Spin spinning={loading}>
                {showModel && <Modal {...modalProps}></Modal>}
                <Table columns={columns} dataSource={list} pagination={paginationProps} rowKey="thirdAttrId" />
            </Spin>
        );
    }
}
function mapStateToProps(state) {
    return {
        ...state.attribute,
        attrItem: state.tagsEdit.fourAttr,
        loading: state.loading.global
    }
}

export default connect(mapStateToProps)(List);
