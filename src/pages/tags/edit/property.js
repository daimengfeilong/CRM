import { Input, Row, Col, Select, Button, Icon } from 'antd'
import ModalTree from '../../../components/modalTree/modal'

const InputGroup = Input.Group
const Option = Select.Option

const Property = ({showModel,dispatch,propertys}) => {

    const treeProps = {
        showModel,
        dispatch,
        title:'增加三级属性',
        tree:propertys,
        onSubmit:(keys) => console.log(keys),
        handleCancel:() => dispatch({type:'tagsEdit/showModel',payload:false})
        
    }

    return (
        <div className="tags-property">
            <div className="head">
                <span>标签属性</span>
                <Button type="primary" icon="plus" onClick={() => dispatch({type:'tagsEdit/showModel',payload:true})}>添加</Button>
            </div>
            <div className="body">
                <Row>
                    <Col span={6}>
                        <div className="three-level">
                            <h3>三级属性</h3>
                            <ul>
                                <li><Button>年龄</Button><Icon type="close-circle" /></li>
                                <li><Button>年龄</Button><Icon type="close-circle" /></li>
                            </ul>
                        </div>
                    </Col>
                    <Col span={18}>
                        <div className="four-level">
                            <h3>四级属性</h3>
                            <InputGroup compact>
                                <Select style={{ width: 100 }} placeholder="请选择">
                                    <Option value="101">介于</Option>
                                    <Option value="102">不介于</Option>
                                    <Option value="103">等于</Option>
                                    <Option value="104">不等于</Option>
                                    <Option value="105">大于</Option>
                                    <Option value="106">小于</Option>
                                    <Option value="107">大于等于</Option>
                                    <Option value="108">小于等于</Option>
                                </Select>
                                <Input style={{ width: 100, textAlign: 'center' }} placeholder="" />
                                <Input style={{ width: 40, borderLeft: 0, pointerEvents: 'none', backgroundColor: '#fff' }} placeholder="~" disabled />
                                <Input style={{ width: 100, textAlign: 'center', borderLeft: 0 }} placeholder="" />
                            </InputGroup>
                            <p className="tips">*所有数字均不带单位</p>
                        </div>
                    </Col>
                </Row>
            </div>
            <ModalTree {...treeProps}></ModalTree>
        </div>
    )
}

export default Property