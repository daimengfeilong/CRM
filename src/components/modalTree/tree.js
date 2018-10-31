import React from 'react'
import { Tree } from 'antd'

const TreeNode = Tree.TreeNode;

const tree = ({ tree, searchValue, expandedKeys, autoExpandParent, onExpand, onCheck }) => {

    const deepTree = data => data.map((item) => {
        const index = item.name.indexOf(searchValue);
        const beforeStr = item.name.substr(0, index);
        const afterStr = item.name.substr(index + searchValue.length);
        const title = index > -1 ? (
            <span>
                {beforeStr}
                <span style={{ color: '#f50' }}>{searchValue}</span>
                {afterStr}
            </span>
        ) : <span>{item.name}</span>;
        if (item.children) {
            return (
                <TreeNode key={item.id} title={title}>
                    {deepTree(item.children)}
                </TreeNode>
            );
        }
        return <TreeNode key={item.id} title={title} />;
    });

    return (
        <Tree
            checkable
            checkStrictly
            onExpand={onExpand}
            onCheck={onCheck}
            expandedKeys={expandedKeys}
            autoExpandParent={autoExpandParent}
        >
            {deepTree(tree)}
        </Tree>
    )
}

export default tree