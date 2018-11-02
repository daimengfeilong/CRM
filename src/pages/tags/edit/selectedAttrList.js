import { Row, Col, Tag } from 'antd'

const selectedAttrList = ({ dispatch, attrList,checkedAttrList }) => {

    const onClose = (row) => {
        dispatch({
            type:'tagsEdit/save',
            payload:{
                attrList:attrList.filter(item => item.id !== row.id)
            }
        })
        
        dispatch({
            type:'tagsEdit/save',
            payload:{
                checkedAttrList:checkedAttrList.filter(item => item !== row.name)
            }
        })
    }
    
    return (
        <div className="selected-attr-list">
            <label>已设置的属性范围:</label>
            <div className="body">
                {
                    attrList.map(item => (
                        <Tag key={item.id} closable onClose={() => onClose(item)}>{item.name}</Tag>
                    ))
                }
            </div>
        </div>
    )
}

export default selectedAttrList