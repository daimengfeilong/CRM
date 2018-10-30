import { Row, Col, Input, Button, Modal, Form, Message,Checkbox,Icon,Tag,Select,List, Tree} from 'antd';
const TreeNode = Tree.TreeNode;
const Search = Input.Search;

const TagModal=({tagsList,dispatch,showTagModel,tagName,expandedKeys,autoExpandParent,checkedKeys,selectedKeys,tagModalList})=>{


  const handleCancel = () => {
    dispatch({
      type: 'portrait/showTagModel',
      payload: false
    })
  }
  const submit = () =>{
   let temp
    tagsList.map((item) => {
        if (item.attrList){
           temp= item.attrList.map((attr)=>{
           let pk={}
            for (let i = 0; i < checkedKeys.length; i++) {
              if (checkedKeys[i]==attr.attrId) {
                pk.tagId=attr.attrId
                pk.tagName=attr.attrName
                return pk
              }
            }
          })
        }
    })
    console.log(temp)
    dispatch({
      type: 'portrait/showTagModel',
      payload: false
    })

    dispatch({
      type: 'portrait/tagModalList',
      payload: temp
    })

  }
  const onCheck= (checkedKeys) => {
    console.log('onCheck', checkedKeys);
    dispatch({
      type: 'portrait/checkedKeys',
      payload: checkedKeys
    })
  }


  const onSelect = (selectedKeys, info) => {
    console.log('onSelect', info);
    dispatch({
      type: 'portrait/selectedKeys',
      payload: selectedKeys
    })
  }
  const getParentKey = (key, value,tree) => {
    for (let i = 0; i < tree.length; i++) {
      const node = tree[i];
      if (node.attrName.indexOf(value) > -1) {
        return key
      }
    }
    return null
  };


 const  onExpand = (expandedKeys) => {
    console.log(expandedKeys)
   dispatch({
     type: 'portrait/autoExpandParent',
     payload: false
   })
   dispatch({
     type: 'portrait/expandedKeys',
     payload: expandedKeys
   })
  }

  const  onChange = (e) => {
    const value = e.target.value;
    console.log(e.target.value)
    const expandedKeys = tagsList.map((item) => {
      if (item.tagName.indexOf(value)&&value!='' > -1) {
        console.log("name:"+item.tagName+"value:"+value)
        return item.tagId
      }else{
          if (item.attrList&&value!=''){
            return getParentKey(item.tagId,value ,item.attrList)
          }
          return null
      }
    }).filter((item, i, self) => item && self.indexOf(item) === i);

    dispatch({
      type: 'portrait/inputTas',
      payload: value
    })

    dispatch({
      type: 'portrait/autoExpandParent',
      payload: true
    })
    console.log("autoExpandParent:"+autoExpandParent)

    console.log(expandedKeys)
    dispatch({
      type: 'portrait/expandedKeys',
      payload: expandedKeys
    })
  }
  const loop = data => data.map((item) => {
    const index = item.tagName.indexOf(tagName);
    const beforeStr = item.tagName.substr(0, index);
    const afterStr = item.tagName.substr(index + tagName.length);
    const title = index > -1 ? (
      <span>
          {beforeStr}
        <span style={{ color: '#f50' }}>{tagName}</span>
        {afterStr}
        </span>
    ) : <span>{item.tagName}</span>;
    if (item.attrList) {
      return (
        <TreeNode key={item.tagId} title={title}>
          {
            loopAttr(item.attrList)
          }
        </TreeNode>
      );
    }
    return <TreeNode key={item.tagId} title={title} />;
  });

  const loopAttr = data => data.map((item) => {
    const index = item.attrName.indexOf(tagName);
    const beforeStr = item.attrName.substr(0, index);
    const afterStr = item.attrName.substr(index + tagName.length);
    const title = index > -1 ? (
      <span>
          {beforeStr}
        <span style={{ color: '#f50' }}>{tagName}</span>
        {afterStr}
        </span>
    ) : <span>{item.attrName}</span>;
    return <TreeNode key={item.attrId} title={title} />;
  });
  return(<Modal
    width="40%"
    title="选择包含标签"
    okText="保存"
    cancelText="取消"
    closable={false}
    mask={true}
    visible={showTagModel}
    onCancel={handleCancel}
    onOk={submit}
  >
      <div>
        <Search style={{ marginBottom: 8,width:300 }} placeholder="请输入" onChange={onChange} />
        <Tree
          checkable
          onExpand={onExpand}
          expandedKeys={expandedKeys}
          autoExpandParent={autoExpandParent}
          onCheck={onCheck}
          checkedKeys={checkedKeys}
          onSelect={onSelect}
          selectedKeys={selectedKeys}
        >
          {loop(tagsList)}
        </Tree>
      </div>

  </Modal>
  )
}

export default TagModal
