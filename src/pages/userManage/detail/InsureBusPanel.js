import { Table } from 'antd'
import { Link } from 'react-router-dom'
const columns = [
  {
    title: '产品名称',
    dataIndex: 'prodName',
    key: 'prodName'
  }, {
    title: '被保人',
    dataIndex: 'insuranceRole',
    key: 'insuranceRole'
  }, {
    title: '实付价格',
    dataIndex: 'realPrice',
    key: 'realPrice'
  }, {
    title: '订单状态',
    dataIndex: 'orderStatus',
    key: 'orderStatus'
  },{
    title:'创建时间',
    dataIndex:'createTime',
    key:'createTime'
  },{
    title:'保障期限',
    dataIndex:'drainageChan',
    key:'drainageChan'
  }, {
    title: '操作',
    key: 'action',
    render: (text, record) => (
      <Link >详情</Link>
    )
  }
]



const CreditBusPanel =({dispatch,insureList,pagination})=>{

  const onPageChange = (pageNo, pageSize) => {
      dispatch({ type: 'userDetail/queryUserInsuranceInfo',payload:{pageNo, pageSize}})
    }

  const onShowSizeChange = (pageNo, pageSize) => {
      dispatch({ type: 'userDetail/queryUserInsuranceInfo',payload:{pageNo, pageSize}})
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
      <Table columns={columns} dataSource={insureList} pagination={paginationProps}  />
    </>
  )

}
export default CreditBusPanel
