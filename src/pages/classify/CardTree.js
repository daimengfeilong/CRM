import { Input, Button, Message, Card, Icon } from 'antd';

const Search = Input.Search

/**
 * 子分类列表组件
 * zxl 
 * @param {*} subClassList
 * @returns CardTree
 * 
 */

const CardTree = ({ dispatch, classItem }) => {
    const { subClassList = [] } = classItem

    //编辑子分类
    const onEditSubClass = (id, val) => {
        const reg = /^([0-9\u4e00-\u9fa5]{1,8})$/

        if (!reg.test(val)) {
            Message.error('请输入1-8个中文或者数字字符')
            return false;
        }

        //保存子类编辑
        subClassList.map(item => {
            if(item.cid === id){
                item.className = val
                item.isEdit = false
            }
        })
        
        dispatch({
            type: 'classify/save',
            payload: {
                classItem:{
                    ...classItem,
                    subClassList:subClassList
                }
            }
        })
    }

    //显示编辑状态
    const showEditSubClass = (e, id) => {
        e.stopPropagation()

        subClassList.map(item => {
            if(item.cid === id){
                item.isEdit = true
            }
        })

        dispatch({
            type: 'classify/save',
            payload: {
                classItem:{
                    ...classItem,
                    subClassList:subClassList
                }
            }
        })
    }

    //选择子分类
    const onSelectedSubClass = (id) => {
        
        subClassList.map(item => {
            if(item.cid === id){
                item.isSelected = !item.isSelected
            }
        })

        dispatch({
            type: 'classify/save',
            payload: {
                classItem:{
                    ...classItem,
                    subClassList:subClassList
                }
            }
        })
    }

    //删除子分类
    const delSubClass = (id) => {
        if (subClassList.every(item => item.isSelected === false)) return false;

        if (classItem.classId) {
            dispatch({
                type: 'classify/delSubClass'
            }).then(data => {
                if (data.code === '0000') {
                    dispatch({ type: 'classify/handlerDel' })
                }
            })
        } else {
            dispatch({ type: 'classify/handlerDel' })
        }
    }

    return (
        <Card
            title="子分类"
            extra={<Button icon="delete" onClick={() => delSubClass()}>移除</Button>}
            className="subtree"
        >
            <ul>
                {
                    subClassList && subClassList.length ?
                        subClassList.map((item, index) => (
                            <li key={item.cid} className={item.isSelected ? 'item selected' : 'item'}>
                                {
                                    item.isEdit ?
                                        <Search
                                            placeholder="请输入子分类名称"
                                            enterButton="保存"
                                            style={{ width: 250 }}
                                            defaultValue={item.className}
                                            onSearch={(val) => onEditSubClass(item.cid, val)}
                                        />
                                        :
                                        <span className="subName" onClick={() => onSelectedSubClass(item.cid)}>{item.className}<Icon type="edit" onClick={(e) => showEditSubClass(e, item.cid)} /></span>
                                }
                            </li>
                        ))
                        :
                        <p style={{ textAlign: 'center', color: 'gray' }}>暂无数据！</p>
                }
            </ul>
        </Card>

    )
}


export default CardTree