import { Modal,Input } from 'antd'
import Tree from './tree'
const Search = Input.Search

const modal = ({ showModel,dispatch,propertys }) => {

    const treeProps = {
        dispatch,
        propertys
    }

    const handleCancel = (e) => {
        dispatch({type:'tagsEdit/showModel',payload:false})
    }
    
    return (
        <Modal
            title="添加三级属性"
            visible={showModel}
            onCancel={handleCancel}
        >
        <Search
            placeholder="查找属性"
            onSearch={value => console.log(value)}
            enterButton
        />
        <Tree {...treeProps}></Tree>
        </Modal>
    )
}

export default modal