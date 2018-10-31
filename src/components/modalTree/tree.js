import { Tree } from 'antd'

const TreeNode = Tree.TreeNode;

const tree = ({tree}) => {

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
            { deepProperty(tree) }
        </Tree>
    )
}

export default tree