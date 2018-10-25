import { Row, Col, Input, Button, Message, Card, Icon } from 'antd';

const Search = Input.Search

/**
 * 子分类列表组件
 * zxl 
 * @param {*} subClassList
 * @returns CardTree
 * 
 */

const CardTree = ({ dispatch, subClassList }) => {
    
    //删除子分类
    const delSubClass = () => {
        const selectedArr = subClassList.filter(item => item.isSelected)
        const selectedIds = selectedArr.map(item => item.classId)
        
        if(!selectedArr.length) return false;

        dispatch({
            type: 'classify/delSubClass',
            payload: selectedIds
        })
    }

    //编辑子分类
    const onEditSubClass = (id,val) => {
        const reg = /^([0-9\u4e00-\u9fa5]{1,6})$/

        if(!reg.test(val)){
            Message.error('请输入1-6个中文或者数字字符')
            return false;
        }

        dispatch({
            type: 'classify/onEditSubClass',
            payload: {
                classId: id,
                className:val
            }
        })
    }

    //显示编辑状态
    const showEditSubClass = (e,id) => {
        e.stopPropagation()

        dispatch({
            type: 'classify/showEditSubClass',
            payload: {
                classId: id
            }
        })
    }

    //选择子分类
    const onSelectedSubClass = (id) => {
        dispatch({
            type: 'classify/onSelectedSubClass',
            payload: {
                classId: id
            }
        })
    }

    return (

        <Row>
            <Col span={14}>
                <Card
                    title="子分类"
                    extra={<Button icon="delete" onClick={delSubClass}>移除</Button>}
                    className="subtree"
                >
                    <ul>
                        {
                            subClassList && subClassList.length ?
                            subClassList.map((item, index) => (
                                <li key={item.classId} className={item.isSelected ? 'item selected' : 'item'}>
                                    {
                                        item.isEdit ? 
                                        <Search
                                            placeholder="请输入子分类名称"
                                            enterButton="保存"
                                            style={{ width: 250 }}
                                            defaultValue={item.className}
                                            onSearch={(val) => { onEditSubClass(item.classId,val) }}
                                        />
                                        :
                                        <span className="subName" onClick={() => { onSelectedSubClass(item.classId) }}>{item.className}<Icon type="edit" onClick={(e) => { showEditSubClass(e,item.classId) }} /></span>
                                    }
                                </li>
                            ))
                            :
                            <p style={{textAlign:'center',color:'gray'}}>暂无数据！</p>
                        }
                    </ul>
                </Card>
            </Col>
        </Row>
    )
}


export default CardTree