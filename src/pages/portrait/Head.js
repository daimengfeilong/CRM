import { Row, Col, Input,Button } from 'antd';

const Search = Input.Search

const Head = ({dispatch}) => {

    const add = () =>{
        dispatch({type:'portrait/save', payload:{classItem:{}}})
        dispatch({type:'portrait/save',payload:{showModel:true}})
    }

    const onSearch = (value) => {
        dispatch({type:'portrait/query',payload:{params:{portraitName:value}}})
    }

    return (
        <Row style={{marginBottom:24}}>
            <Col span={4}>
                <Search
                    placeholder="请输入画像名称"
                    enterButton="查找"
                    onSearch={value => onSearch(value)}
                />
            </Col>
            <Col span={20} style={{textAlign:'right'}}>
                <Button type="primary" icon="plus" onClick={add}>新增画像</Button>
            </Col>
        </Row>
    )
}


export default Head
