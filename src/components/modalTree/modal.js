import React from 'react'
import { Modal, Input } from 'antd'
import RenderTree from './tree'

const Search = Input.Search

/**
 * 公共的ModalTree组件
 * 
 * 接收参数
 * title:String
 * showModel:Boolean
 * handleCancel:func
 * handleSubmit:func @returns [] checkedKeys
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

const getExpandedKeys = (value, tree) => {

    const expandedKeys = []

    const deepTree = (item) => {
        if (item.name.indexOf(value) > -1) {
            expandedKeys.push(getParentKey(item.id, tree))
        } else {
            if (item.children) {
                item.children.map(deepTree)
            }
        }
    }

    tree.map(deepTree)

    return expandedKeys.filter((item, i, self) => item && self.indexOf(item) === i);
}

const getKeysByName = (keys,tree) => {
    const temp = []

    const deepTree = (item) => {
        if (keys.includes(item.id)) {
            temp.push({
                id:item.id,
                name:item.name
            })
        } else {
            if (item.children) {
                item.children.map(deepTree)
            }
        }
    }

    tree.map(deepTree)

    return temp
}

class modal extends React.Component {
    constructor(props){
        super(props)

        const { checkedKeys } = this.props
        
        this.state = {
            checkedKeys: checkedKeys,
            expandedKeys: checkedKeys,
            searchValue: '',
            autoExpandParent: true,
        }
    }


    handleCancel = () => {
        this.props.handleCancel()
    }


    handleSubmit = () => {
        const { tree } = this.props
        const checkedKeys = getKeysByName(this.state.checkedKeys,tree)

        this.props.onSubmit(checkedKeys)
        this.handleCancel()
    }

    onExpand = (expandedKeys) => {
        this.setState({
            expandedKeys,
            autoExpandParent: false,
        });
    }

    onCheck = ({ checked }) => {
        this.setState({
            checkedKeys: checked
        })
    }

    onChange = (e) => {
        const { tree } = this.props

        const value = e.target.value;

        const expandedKeys = getExpandedKeys(value, tree)

        this.setState({
            expandedKeys,
            searchValue: value,
            autoExpandParent: true,
        });
    }

    render() {
        const { showModel, tree, title } = this.props
        const { searchValue,expandedKeys,autoExpandParent,checkedKeys } = this.state
        
        const treeProps = {
            tree,
            searchValue,
            expandedKeys,
            checkedKeys,
            autoExpandParent,
            onCheck:this.onCheck,
            onExpand:this.onExpand,
        }

        return (
            <Modal
                title={title}
                visible={showModel}
                onCancel={this.handleCancel}
                onOk={this.handleSubmit}
                maskClosable={false}
                className="modal-tree"
            >
                <Search style={{ marginBottom: 8 }} placeholder="搜索" onChange={this.onChange} />
                <RenderTree {...treeProps}></RenderTree>
            </Modal>
        );
    }
}
export default modal
