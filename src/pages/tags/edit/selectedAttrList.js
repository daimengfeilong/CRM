import { Tag } from 'antd'

const selectedAttrList = ({ dispatch, attrList,checkedAttrList }) => {

    const onClose = (row) => {
        const id = row.alid ? row.alid : row.attrId

        dispatch({
            type:'tagsEdit/save',
            payload:{
                attrList:attrList.filter(item => item[id] !== row[id])
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
                    attrList.map((item,index) => (
                        <Tag key={`${item.alid || item.attrId}-${index}`} closable onClose={() => onClose(item)}>{item.attrName}</Tag>
                    ))
                }
            </div>
        </div>
    )
}

export default selectedAttrList