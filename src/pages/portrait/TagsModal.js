import { Row, Col, Input, Button, Modal, Form, Message,Checkbox,Icon,Tag,Select,List, Tree} from 'antd';
const TreeNode = Tree.TreeNode;
const Search = Input.Search;

const TagModal=({tagsList,dispatch,showTagModel,tagName})=>{


  console .log(this.state)
  const handleCancel = () => {
    dispatch({
      type: 'portrait/showTagModel',
      payload: false
    })

  }

  const submit = () =>{

  }

  const emitEmpty = () => {
    dispatch({
      type: 'portrait/inputTas',
      payload: ''
    })
  }

  // const  onChange = (e) => {
  //   dispatch({
  //     type: 'portrait/inputTas',
  //     payload: e.target.value
  //   })
  //
  // }

  this.state = {
    expandedKeys: [],
    searchValue: '',
    autoExpandParent: true,
  }

 const  onExpand = (expandedKeys) => {
    console.log(expandedKeys)
   this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  }

  const  onChange = (e) => {
    const value = e.target.value;
    const expandedKeys = dataList.map((item) => {
      if (item.title.indexOf(value) > -1) {
        return getParentKey(item.key, gData);
      }
      return null;
    }).filter((item, i, self) => item && self.indexOf(item) === i);
    this.setState({
      expandedKeys,
      searchValue: value,
      autoExpandParent: true,
    });
  }
  const x = 3;
  const y = 2;
  const z = 1;
  const gData = [];

  const generateData = (_level, _preKey, _tns) => {
    const preKey = _preKey || '0';
    const tns = _tns || gData;

    const children = [];
    for (let i = 0; i < x; i++) {
      const key = `${preKey}-${i}`;
      tns.push({ title: key, key });
      if (i < y) {
        children.push(key);
      }
    }
    if (_level < 0) {
      return tns;
    }
    const level = _level - 1;
    children.forEach((key, index) => {
      tns[index].children = [];
      return generateData(level, key, tns[index].children);
    });
  };
  generateData(z);

  const dataList = [];
  const generateList = (data) => {
    for (let i = 0; i < data.length; i++) {
      const node = data[i];
      const key = node.key;
      dataList.push({ key, title: key });
      if (node.children) {
        generateList(node.children, node.key);
      }
    }
  };
  generateList(gData);

  const getParentKey = (key, tree) => {
    let parentKey;
    for (let i = 0; i < tree.length; i++) {
      const node = tree[i];
      if (node.children) {
        if (node.children.some(item => item.key === key)) {
          parentKey = node.key;
        } else if (getParentKey(key, node.children)) {
          parentKey = getParentKey(key, node.children);
        }
      }
    }
    return parentKey;
  };

  const suffix = tagName ? <Icon type="close-circle" onClick={emitEmpty} /> : null;


  const { searchValue, expandedKeys, autoExpandParent } = this.state;
  const loop = data => data.map((item) => {
    const index = item.title.indexOf(searchValue);
    const beforeStr = item.title.substr(0, index);
    const afterStr = item.title.substr(index + searchValue.length);
    const title = index > -1 ? (
      <span>
          {beforeStr}
        <span style={{ color: '#f50' }}>{searchValue}</span>
        {afterStr}
        </span>
    ) : <span>{item.title}</span>;
    if (item.children) {
      return (
        <TreeNode key={item.key} title={title}>
          {loop(item.children)}
        </TreeNode>
      );
    }
    return <TreeNode key={item.key} title={title} />;
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
      {/*<Row gutter={24}>*/}
      {/*<Col span={10}>*/}
      {/*<Input*/}
        {/*placeholder="请输入标签名称"*/}
        {/*suffix={suffix}*/}
        {/*value={tagName}*/}
        {/*onChange={onChange}*/}
        {/*ref={node => this.userNameInput = node}*/}
      {/*/>*/}
      {/*</Col>*/}
      {/*<Col  span={14}>*/}
        {/*<Button type="primary" shape="circle" icon="search" />*/}
      {/*</Col>*/}
      {/*</Row>*/}
      {/*<div>*/}
      {/*</div>*/}
      {/*<List*/}

        {/*size="small"*/}
        {/*// grid={{gutter: 16, column: 2}}*/}
        {/*itemLayout="vertical"*/}
        {/*dataSource={tagsList}*/}
        {/*renderItem={item => (*/}
          {/*<List.Item*/}
            {/*extra={*/}
              {/*<Checkbox ></Checkbox>*/}
             {/*}>*/}
            {/*<List.Item.Meta*/}
              {/*title={item.tagName}*/}
            {/*/>*/}
          {/*</List.Item>)}*/}
      {/*/>*/}
      <div>
        <Search style={{ marginBottom: 8 }} placeholder="Search" onChange={onChange} />
        <Tree
          onExpand={onExpand}
          expandedKeys={expandedKeys}
          autoExpandParent={true}
        >
          {loop(gData)}
        </Tree>
      </div>

  </Modal>
  )
}

export default TagModal
