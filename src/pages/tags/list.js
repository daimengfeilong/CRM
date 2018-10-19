import { connect } from 'dva';
import { Link } from 'react-router-dom'
import { Table, Divider, Tag, Row, Col, Button,Modal } from 'antd';

const confirm = Modal.confirm;

const List = ({ tags,dispatch }) => {

    const del = (id) => {
        confirm({
            title: '确认删除？',
            content: '',
            onOk() {
                dispatch({
                    type:'tags/del',
                    payload:{_id:id}
                })
            },
        });
    }

    const columns = [{
        title: '名称',
        dataIndex: 'name',
        key: 'name'
    }, {
        title: '描述',
        dataIndex: 'describe',
        key: 'describe',
    }, {
        title: '颜色',
        dataIndex: 'color',
        key: 'color',
        render: color => (
            <Tag color={color} key={color} style={{width:'64px',textAlign:'center'}}>{color}</Tag>
        ),
    }, {
        title: '操作',
        key: 'action',
        render: (row, record) => (
            <span>
                <Link to={`/tags/edit?id=${row._id}`}>编辑</Link>
                <Divider type="vertical" />
                <a href="javascript:" onClick={() =>{ del(row._id) }}>删除</a>
            </span>
        ),
    }];
    
    return (
        <Table columns={columns} dataSource={tags} rowKey="_id" />
    );
}

function mapStateToProps(state) {
    return state.tags
}

export default connect(mapStateToProps)(List);