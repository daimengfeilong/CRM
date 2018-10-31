import { Tree } from 'antd'

const TreeNode = Tree.TreeNode;

const tree = ({dispatch,propertys}) => {

    const deepProperty = (tree) => {
        return tree.map(item => {
            if(Array.isArray(item.children)){
                return (
                    <TreeNode title={item.name} key={item.id}>
                        {
                            deepProperty(item.children)
                        }
                    </TreeNode>
                )
            }
            return <TreeNode title={item.name} key={item.id} />
        })
    }

    return (
        <Tree
            checkable
        >
            { deepProperty(propertys) }
        </Tree>
    )
}

export default tree