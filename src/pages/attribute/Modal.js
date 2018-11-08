import { Modal, Form, Card } from 'antd';

const modal = ({ showModel, dispatch, attrItem }) => {
    const { datas = [],isNum } = attrItem
    
    if(isNum && datas[0]){
        var { min } = datas.find(item => item.min)
        var { max } = datas.find(item => item.max)
    }

    const handleCancel = () => {
        dispatch({
            type: 'attribute/save',
            payload: {
                showModel:false
            }
        })

    }

    return (
        <Modal
            title="查看四级属性"
            width="30%"
            footer={null}
            visible={showModel}
            onCancel={handleCancel}
        >
            <p>三级属性：{attrItem.attrName}</p>
            <label>四级属性：</label>
            <Card style={{marginTop: '10px'}}>
            {
                datas[0] ? 
                isNum ? `${min} - ${max}` : datas.join('，')
                :
                <p>暂无数据！</p>
            }
            </Card>
        </Modal>
    )
}

const modalWrap = Form.create()(modal);

export default modalWrap
