import { Checkbox, Row, Col } from 'antd';

const getHasChecked = (arr,name) => {
    
    return arr.find(item => item === name)
}

const opt = ({ dispatch,fourAttr,attrList,checkedAttrList}) => {
    const { datas = [] } = fourAttr

    console.log(checkedAttrList);
    
    const onChange = (e) => {
        const { checked, value } = e.target
        if(checked){
            dispatch({
                type:'tagsEdit/save',
                payload:{
                    checkedAttrList:[...checkedAttrList,value]
                }
            })
            dispatch({
                type:'tagsEdit/addAttrListItem',
                payload:{
                    attrId:fourAttr.attrId,
                    id:`AL${Date.now()}`,
                    name:value,
                    optName:value,
                    attrName:value
                }
            })
        }else{
            dispatch({
                type:'tagsEdit/save',
                payload:{
                    attrList:attrList.filter(item => item.optName !== value)
                }
            })
            dispatch({
                type:'tagsEdit/save',
                payload:{
                    checkedAttrList:checkedAttrList.filter(item => item !== value)
                }
            })
        }
    }

    return (
        <>
            {
                datas[0] ? 
                    <Row>
                        {
                            datas.map((item,index) => (
                                <Col span={12} style={{marginTop:10}} key={index}>
                                    {
                                        getHasChecked(checkedAttrList,item) ?
                                        <Checkbox defaultChecked onChange={onChange} value={item}>{item}</Checkbox>
                                        :
                                        <Checkbox onChange={onChange} value={item}>{item}</Checkbox>
                                    }
                                </Col>
                            ))
                        }
                    </Row>
                :
                <p>暂无数据！</p>
            }
        </>
        
    )
}

export default opt