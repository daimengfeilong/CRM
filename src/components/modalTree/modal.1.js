import React from 'react'
import { Tree, Modal, Input } from 'antd'
import RenderTree from './tree'

const Search = Input.Search
const TreeNode = Tree.TreeNode;

/**
 * 公共的ModalTree组件
 * 
 * 接收参数
 * title:String
 * showModel:Boolean
 * handleCancel:func
 * tree:[
        {
            id:'1d32fg31j',
            name:'学历',
            children:[
                {
                    id:'tyuyt21rdg',
                    name:'大专',
                },
                {
                    id:'56fdgf132',
                    name:'本科',
                }
            ]
        }
    ]
 * 
 * 
 */

const getParentKey = (id, tree) => {
    let parentKey;
    
    for (let i = 0; i < tree.length; i++) {
        const node = tree[i];
        if (node.children) {
            if (node.children.some(item => item.id === id)) {
                parentKey = node.id;
            } else if (getParentKey(id, node.children)) {
                parentKey = getParentKey(id, node.children);
            }
        }
    }
    return parentKey;
};

class modal extends React.Component {
    state = {
        expandedKeys: [],
        searchValue: '',
        autoExpandParent: true,
    }

    onExpand = (expandedKeys) => {
        this.setState({
            expandedKeys,
            autoExpandParent: false,
        });
    }

    handleCancel = (e) => {
        this.props.handleCancel()
    }

    onChange = (e) => {
        const { tree } = this.props

        const value = e.target.value;
        const expandedKeys = []

        const deepKey = (item) => {
            if(item.name.indexOf(value) > -1){
                expandedKeys.push(getParentKey(item.id, tree))
            }else {
                if(item.children){
                    item.children.map(deepKey)
                }
            }
        }

        tree.map(deepKey)

        let aa = expandedKeys.filter((item, i, self) => item && self.indexOf(item) === i);

        console.log(aa);

        this.setState({
            expandedKeys:aa,
            searchValue: value,
            autoExpandParent: true,
        });
    }

    render() {
        const { showModel, tree, title } = this.props
        const { searchValue, expandedKeys, autoExpandParent } = this.state;

        const loop = data => data.map((item) => {
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
                        {loop(item.children)}
                    </TreeNode>
                );
            }
            return <TreeNode key={item.id} title={title} />;
        });

        return (
            <Modal
                title={title}
                visible={showModel}
                onCancel={this.handleCancel}
            >
                <Search style={{ marginBottom: 8 }} placeholder="搜索" onChange={this.onChange} />
                <Tree
                    checkable
                    onExpand={this.onExpand}
                    expandedKeys={expandedKeys}
                    autoExpandParent={autoExpandParent}
                >
                    {loop(tree)}
                </Tree>
            </Modal>
        );
    }
}
export default modal
