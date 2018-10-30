import { Modal } from 'antd'

const modal = ({ showModel,dispatch }) => {

    const handleCancel = (e) => {
        dispatch({type:'tagsEdit/showModal',payload:false})
    }
    return (
        <Modal
            title="Basic Modal"
            visible={showModel}
            onCancel={handleCancel}
        >
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
        </Modal>
    )
}

export default modal