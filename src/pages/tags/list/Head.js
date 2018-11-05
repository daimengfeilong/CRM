import { Row, Col, Input, Button } from 'antd';
import { withRouter } from 'dva/router'

const Search = Input.Search

const Head = ({ dispatch, history }) => {

    const add = () => {
        history.push('/tags/edit')
    }

    const onSearch = (v) => {
        dispatch({
            type: 'tags/query',
            payload: {
                params: {
                    tagName: v
                }
            }
        })
    }

    return (
        <Row style={{ marginBottom: 24 }}>
            <Col span={4}>
                <Search
                    placeholder="请输入标签名称"
                    enterButton="查找"
                    onSearch={onSearch}
                />
            </Col>
            <Col span={20} style={{ textAlign: 'right' }}>
                <Button type="primary" icon="plus" onClick={add}>新增标签</Button>
            </Col>
        </Row>
    )
}


export default withRouter(Head)