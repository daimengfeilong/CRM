import { Icon } from 'antd'

const threeTree = ({dispatch,selectedTree3,selectedTree3Item,attrItem}) => {
    const { attrList = [] } = attrItem

    const clickThreeItem = (item) => {
        const { ranges = {} } = item
        if(selectedTree3Item.id == item.id) return false;
        
        dispatch({
            type: 'tagsEdit/save',
            payload: {
                selectedRange: {
                    name: ranges.name,
                    value: ranges.value
                }
            }
        })
        dispatch({type:'tagsEdit/save',payload:{selectedTree3Item:item}})
        dispatch({type:'tagsEdit/getAttributeListEnum',payload:{attrId:item.id}})
    }


    const removeThreeItem = (item) => {
        
        dispatch({type:'tagsEdit/removeThreeItem',payload:item})

        dispatch({
            type: 'tagsEdit/save',
            payload: {
                attrItem:{
                    ...attrItem,
                    attrList:attrList.filter(al => al.attrId !== item.id)
                }
            }
        })

        if(selectedTree3.length === 1){
            dispatch({
                type: 'tagsEdit/save',
                payload: {
                    fourAttr:{}
                }
            })
        }
    }

    return (
        <div className="three-level">
            <h3>三级属性</h3>
            <ul>
                {
                    selectedTree3.map(item => (
                        <li key={item.id}>
                            <div className={selectedTree3Item.id === item.id ? 'box-wrap selected' : 'box-wrap'} onClick={() => clickThreeItem(item)}>{item.name}</div>
                            <Icon type="close-circle" onClick={() => removeThreeItem(item)} />
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default threeTree