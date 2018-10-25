import { Row, Col, Input,Button } from 'antd';

const Search = Input.Search

/**
 * 列表头部
 * zxl 
 * @param {*} props
 * @returns Head
 * 
 */

const Head = ({dispatch}) => {

    const add = () =>{
        dispatch({
            type:'classify/save',
            payload:{
                classItem:{}
            }
        })

        dispatch({
            type:'classify/showModel',
            payload:true
        })
    }

    const onSearch = (value) => {

        dispatch({
            type:'classify/query',
            payload:{
                params:{
                    className:value
                }
            }
        })
    }

    return (
        <Row style={{marginBottom:24}}>
            <Col span={4}>
                <Search
                    placeholder="请输入分类名称"
                    enterButton="查找"
                    onSearch={value => onSearch(value)}
                />
            </Col>
            <Col span={20} style={{textAlign:'right'}}>
                <Button type="primary" icon="plus" onClick={add}>新增分类</Button>
            </Col>
        </Row>
    )
}


export default Head