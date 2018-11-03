import { Row, Col, Button } from 'antd'
import ThreeTree from './threeTree'
import FourAttr from './fourAttr'


const Property = ({dispatch,selectedTree3,selectedTree3Item,fourAttr,attrRange,selectedRange,attrList,checkedAttrList}) => {

    const threeTreeProps = {
        selectedTree3Item,
        selectedTree3,
        dispatch
    }

    const fourProps = {
        dispatch,
        fourAttr,
        attrRange,
        selectedRange,
        selectedTree3Item,
        attrList,
        checkedAttrList
    }

    return (
        <div className="tags-property">
            <div className="head">
                <span>标签属性</span>
                <Button type="primary" icon="plus" onClick={() => dispatch({type:'tagsEdit/save',payload:{showModel:true}})}>添加</Button>
            </div>
            <div className="body">
                <Row>
                    <Col span={6} className="three-row">
                        <ThreeTree {...threeTreeProps}></ThreeTree>
                    </Col>
                    <Col span={18}>
                        <FourAttr {...fourProps}></FourAttr>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default Property