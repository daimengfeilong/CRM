import { Modal, Form } from 'antd';

const fourBody = {
    padding: '10px 15px',
    border: '1px solid #efefef',
    borderRadius: '7px',
    marginTop: '10px'
}

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
            <div style={fourBody}>
            {
                datas[0] ? 
                isNum ? `${min} - ${max}` : datas.join('，')
                :
                <p>暂无数据！</p>
            }
            </div>
        </Modal>
    )
}

const modalWrap = Form.create()(modal);

export default modalWrap
