import Num from './numAttr'
import Opt from './optAttr'

const threeTree = ({ dispatch, fourAttr, attrRange, selectedRange,selectedTree3Item,attrList,checkedAttrList }) => {

    const porps = {
        dispatch,
        fourAttr,
        attrRange,
        attrList,
        selectedRange,
        selectedTree3Item,
        checkedAttrList
    }

    return (
        <div className="four-level">
            <h3>四级属性</h3>
            {
                fourAttr.isNum ? <Num {...porps}></Num> : <Opt {...porps}></Opt>
            }
        </div>
    )
}

export default threeTree