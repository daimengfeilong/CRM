import { Checkbox, Row, Col } from 'antd';


const opt = ({ dispatch, fourAttr, attrList, checkedAttrList, selectedTree3Item }) => {
    const { datas = [] } = fourAttr

    const saveAttrList = (list) => {
        dispatch({
            type: 'tagsEdit/saveAttrList',
            payload: { list }
        })
    }

    const addAttrListItem = (name) => {
        dispatch({
            type: 'tagsEdit/addAttrListItem',
            payload: {
                optName: name,
                attrVal: name,
                alid: `AL${Date.now()}`,
                attrId: fourAttr.attrId,
                attrName: selectedTree3Item.name,
                nickName: `${selectedTree3Item.name} | ${name}`,
            }
        })
    }

    const difference = (a,b) => {
        //找出两个数组之间的差集
        const difference = a.concat(b).filter(v => !a.includes(v) || !b.includes(v))

        return difference[0]
    }



    const onChange = (values) => {
        const flag = difference(checkedAttrList,values)

        if(checkedAttrList.length < values.length){
            addAttrListItem(flag)
        }else{
            saveAttrList(attrList.filter(item => item.optName != flag))
        }

        dispatch({
            type: 'tagsEdit/save',
            payload: {
                checkedAttrList:values
            }
        })
    }


    return (
        <>
            {
                datas[0] ?
                    <Checkbox.Group style={{ width: '100%' }} onChange={onChange} value={checkedAttrList}>
                        <Row>
                            {
                                datas.map((item, index) => (
                                    <Col span={12} style={{ marginTop: 10 }} key={index}>
                                        <Checkbox value={item}>{item}</Checkbox>
                                    </Col>
                                ))
                            }
                        </Row>
                    </Checkbox.Group>
                    :
                    <p>暂无数据！</p>
            }
        </>
    )
}

export default opt