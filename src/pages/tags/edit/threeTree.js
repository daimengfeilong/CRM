import { Icon } from 'antd'

const threeTree = ({dispatch,selectedTree3,selectedTree3Item}) => {


    const clickThreeItem = (item) => {
        dispatch({type:'tagsEdit/save',payload:{selectedTree3Item:item}})
        dispatch({type:'tagsEdit/getAttributeListEnum',payload:{attrId:item.id}})
    }

    const removeThreeItem = (item) => {
        dispatch({type:'tagsEdit/removeThreeItem',payload:item})
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