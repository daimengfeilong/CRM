import { Table } from 'antd'

const columns = [
  {
    title: '产品名称',
    dataIndex: 'prodName',
    key: 'prodName'
  }, {
    title: '申请本金',
    dataIndex: 'applyPrincipal',
    key: 'applyPrincipal'
  }, {
    title: '审批本金',
    dataIndex: 'auditPrincipal',
    key: 'auditPrincipal'
  }, {
    title: '应还利息',
    dataIndex: 'returnInterest',
    key: 'returnInterest'
  },{
    title:'应还服务费',
    dataIndex:'serviceCharge',
    key:'serviceCharge'
  },{
    title:'引流渠道',
    dataIndex:'drainageChan',
    key:'drainageChan'
  },{
    title:'贷前状态',
    dataIndex:'preloanStatus',
    key:'preloanStatus'
  },{
    title:'贷后状态',
    dataIndex:'sufloanStatus',
    key:'sufloanStatus'
  }
]



const CreditBusPanel =({dispatch,creditList,pagination,type})=>{

  const onPageChange = (page, pageSize) => {
    if (type===1){
      dispatch({ type: 'userDetail/queryUserLoanInfo',payload:{pageNo:page}})
    } else {
      dispatch({ type: 'userDetail/queryUserLoanInfo',payload:{pageNo:page}})
    }

  }

  const onShowSizeChange = (page, pageSize) => {
    if (type===1){
      dispatch({ type: 'userDetail/queryUserLoanInfo',payload:{pageNo:page,pageSize}})
    } else {
      dispatch({ type: 'userDetail/queryUserLoanInfo',payload:{pageNo:page,pageSize}})
    }

  }
  const paginationProps = {
    showQuickJumper:true,
    showSizeChanger:true,
    total:pagination.totalSize,
    onChange:onPageChange,
    onShowSizeChange:onShowSizeChange,
    showTotal:total => `共 ${total} 条`,
  }

  return(
    <>
      <Table columns={columns} dataSource={creditList} pagination={paginationProps}  />
    </>
  )

}
export default CreditBusPanel
