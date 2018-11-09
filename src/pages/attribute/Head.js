import { Row, Col, Input } from 'antd';

const Search = Input.Search

/**
 * 列表头部
 * zxl 
 * @param {*} props
 * @returns Head
 * 
 */

const Head = ({dispatch}) => {

    const onSearch = (value) => {

        dispatch({
            type:'attribute/query',
            payload:{
                params:{
                    attrName:value
                }
            }
        })
    }

    return (
        <Row style={{marginBottom:24}}>
            <Col span={4}>
                <Search
                    placeholder="请输入三级属性名称"
                    enterButton="查找"
                    onSearch={value => onSearch(value)}
                />
            </Col>
        </Row>
    )
}


export default Head