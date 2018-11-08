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



const CreditBusPanel =({dispatch,creditList,pagination})=>{

  const onPageChange = (pageNo, pageSize) => {
      dispatch({ type: 'userDetail/queryUserLoanInfo',payload:{pageNo, pageSize}})

  }

  const onShowSizeChange = (pageNo, pageSize) => {
      dispatch({ type: 'userDetail/queryUserLoanInfo',payload:{pageNo, pageSize}})

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
